import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '',
  'work/',
  'about/',
  'experience/',
  'work/eduagent/',
  'work/agentic-doc-retrieval/',
  'work/ai-stock-agent/',
  'work/ask-eddie/',
];

test.beforeEach(async ({ page }) => {
  // Do not send review traffic to the owner's analytics.
  await page.route(/googletagmanager|google-analytics|cloud\.umami/, (route) =>
    route.fulfill({ body: '', contentType: 'application/javascript' })
  );
});

for (const width of [320, 390, 768, 1280, 1440, 1920]) {
  test(`responsive pages and navigation at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.setTimeout(60000);
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of [
      '',
      'work/',
      'work/agentic-doc-retrieval/',
      'about/',
      'experience/',
    ]) {
      await page.goto(`./${route}`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('h1')).toBeInViewport();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        route
      ).toBeLessThanOrEqual(width);
      await page.screenshot({
        path: testInfo.outputPath(
          `${route.replaceAll('/', '-') || 'home'}.png`
        ),
        fullPage: true,
      });
      for (const link of await page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link')
        .all()) {
        const box = await link.boundingBox();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
        expect(box!.height).toBeGreaterThanOrEqual(42);
      }
    }
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Work', exact: true })
      .click();
    await expect(page.locator('.work-index article')).toHaveCount(4);
    await expect(
      page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Work', exact: true })
    ).toHaveAttribute('aria-current', 'page');
    await page
      .locator('.work-copy')
      .getByRole('link', { name: 'EduAgent', exact: true })
      .click();
    await expect(page.locator('h1')).toHaveText('EduAgent');
    await page.reload();
    await expect(page.locator('h1')).toHaveText('EduAgent');
    await page
      .getByRole('navigation', { name: 'Project sections' })
      .getByRole('link', { name: '02 Approach' })
      .click();
    await expect(page.locator('#approach h2')).toBeInViewport();
    const heading = await page.locator('#approach h2').boundingBox();
    expect(heading!.y).toBeGreaterThanOrEqual(width <= 760 ? 76 : 92);
    await page.getByRole('link', { name: 'All work', exact: true }).click();
    await expect(page.locator('.work-index article')).toHaveCount(4);
    await expect(page).toHaveURL(/\/work\/$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/work\/eduagent\/#approach$/);
    await expect(page.locator('h1')).toHaveText('EduAgent');
    await page.goForward();
    await expect(page).toHaveURL(/\/work\/$/);
    await expect(page.locator('.work-index article')).toHaveCount(4);
    expect(errors).toEqual([]);
  });
}

test('keyboard skip link and contact disclosure', async ({ page }) => {
  await page.goto('./about/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' })
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const button = page.getByRole('button', { name: 'Reveal Email' });
  await button.focus();
  await page.keyboard.press('Enter');
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Tab');
  await expect(page.locator('main a[href^="mailto:"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(button).toBeFocused();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
});

test('skills map is optional, bounded, and readable without motion', async ({
  page,
}, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./about/');
  const diagram = page.getByRole('region', { name: 'Skills diagram' });
  await expect(diagram).toHaveCount(0);
  await page.getByText('Explore my skill connections', { exact: true }).click();
  await expect(diagram.locator('circle')).toHaveCount(49);
  const positions = await diagram
    .locator('circle')
    .evaluateAll((nodes) =>
      nodes.map((n) => [n.getAttribute('cx'), n.getAttribute('cy')])
    );
  await page.waitForTimeout(250);
  expect(
    await diagram
      .locator('circle')
      .evaluateAll((nodes) =>
        nodes.map((n) => [n.getAttribute('cx'), n.getAttribute('cy')])
      )
  ).toEqual(positions);
  expect(
    await diagram.locator('text').evaluateAll((nodes) =>
      nodes.every((node) => {
        const box = (node as SVGGraphicsElement).getBBox();
        return (
          box.x >= 0 &&
          box.y >= 0 &&
          box.x + box.width <= 928 &&
          box.y + box.height <= 928
        );
      })
    )
  ).toBe(true);
  await diagram.screenshot({ path: testInfo.outputPath('skill-map.png') });
  await page.getByText('Read the connections as text', { exact: true }).click();
  await expect(page.getByText('AI → LangGraph', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390
  );
  await page.getByText('Explore my skill connections', { exact: true }).click();
  await expect(diagram).toHaveCount(0);
});

test('globe pauses, resumes, respects live reduced motion and stops offscreen', async ({
  page,
}) => {
  await page.addInitScript(() => {
    const context = WebGL2RenderingContext.prototype;
    const original = context.drawArrays;
    let calls = 0;
    Object.defineProperty(window, '__globeDraws', { get: () => calls });
    context.drawArrays = function (...args) {
      calls++;
      return original.apply(this, args);
    };
  });
  const drawCount = () =>
    page.evaluate(
      () => (window as unknown as { __globeDraws: number }).__globeDraws
    );
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('./');
  await expect(page.locator('canvas')).toHaveCount(1);
  await expect.poll(drawCount).toBeGreaterThan(10);
  await page.getByRole('button', { name: 'Pause globe' }).click();
  await expect(
    page.getByRole('button', { name: 'Resume globe' })
  ).toHaveAttribute('aria-pressed', 'true');
  const paused = await drawCount();
  await page.waitForTimeout(250);
  expect(await drawCount()).toBe(paused);
  await page.getByRole('button', { name: 'Resume globe' }).click();
  await expect.poll(drawCount).toBeGreaterThan(paused);
  await page.locator('footer').scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);
  const offscreen = await drawCount();
  await page.waitForTimeout(250);
  expect(await drawCount()).toBe(offscreen);
  await page.locator('#home').scrollIntoViewIfNeeded();
  await expect.poll(drawCount).toBeGreaterThan(offscreen);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.getByRole('button', { name: 'Pause globe' })).toHaveCount(
    0
  );
  const reduced = await drawCount();
  await page.waitForTimeout(250);
  expect(await drawCount()).toBe(reduced);
  expect(
    await page
      .locator('.page-enter')
      .evaluate((el) => getComputedStyle(el).animationDuration)
  ).toBe('1e-05s');
});

test('content and vector fallback survive missing map data', async ({
  page,
}) => {
  await page.route('**/world-110m.json', (route) =>
    route.fulfill({ status: 404, body: 'missing' })
  );
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('./');
  await expect(page.locator('.atlas-fallback')).toBeVisible();
  await page.getByRole('link', { name: 'Explore my work' }).click();
  await expect(page.getByRole('heading', { name: 'EduAgent' })).toBeVisible();
  expect(errors).toEqual([]);
});

for (const width of [320, 768, 1440]) {
  test(`accessibility across page types at ${width}px`, async ({ page }) => {
    test.setTimeout(90000);
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      '',
      'work/',
      'work/eduagent/',
      'about/',
      'experience/',
    ]) {
      await page.goto(`./${route}`);
      if (route === 'about/') {
        await page
          .getByText('Explore my skill connections', { exact: true })
          .click();
        await expect(
          page.getByRole('region', { name: 'Skills diagram' }).locator('svg')
        ).toBeVisible();
      }
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations, route).toEqual([]);
    }
  });
}

test('core routes and artwork work without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const page = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  for (const route of routes) {
    const response = await page.goto(`${baseURL}${route}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible();
    await expect(
      page.locator('footer a[href^="mailto:"]').first()
    ).toBeVisible();
    if (route.startsWith('work/'))
      await expect(page.locator('.project-art').first()).toBeVisible();
  }
  await page.goto(`${baseURL}experience/`);
  await expect(
    page.getByRole('heading', { name: 'Numo', exact: true })
  ).toBeVisible();
  await expect(
    page.getByText(/Building and scaling financial technology/)
  ).toBeVisible();
  await page.close();
});

test('every route has unique metadata and export links resolve', async ({
  page,
  request,
  baseURL,
}) => {
  test.setTimeout(60000);
  const basePath = new URL(baseURL!).pathname.replace(/\/$/, '');
  const titles = new Set<string>();
  const destinations = new Set<string>();
  for (const route of routes) {
    await page.goto(`./${route}`);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://mayoulong.dev${basePath}/${route}`
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `https://mayoulong.dev${basePath}/${route}`
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      `https://mayoulong.dev${basePath}/social-image.png`
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /\S.{30}/
    );
    for (const href of await page
      .locator('a[href]')
      .evaluateAll((anchors) =>
        anchors.map((a) => (a as HTMLAnchorElement).href)
      )) {
      if (href.startsWith(new URL(baseURL!).origin))
        destinations.add(href.split('#')[0]);
    }
  }
  for (const url of Array.from(destinations))
    expect((await request.get(url)).status(), url).toBe(200);
  for (const file of [
    'avatar.webp',
    'yma2022.pdf',
    'world-110m.json',
    'cities.json',
    'favicon/favicon.ico',
    'social-image.png',
    'sitemap.xml',
    'robots.txt',
  ]) {
    expect((await request.get(`${baseURL}${file}`)).status(), file).toBe(200);
  }
  const sitemap = await (await request.get(`${baseURL}sitemap.xml`)).text();
  for (const route of routes)
    expect(sitemap).toContain(
      `https://mayoulong.dev${basePath}/${route.replace(/\/$/, '')}`
    );
  expect(sitemap).not.toContain('social-image.png');
  expect(
    (await request.get(`${baseURL}social-image.png`)).headers()['content-type']
  ).toBe('image/png');
  expect(await (await request.get(`${baseURL}robots.txt`)).text()).toContain(
    `https://mayoulong.dev${basePath}/sitemap.xml`
  );
});

test('unknown nested route returns a useful 404 and recovery link', async ({
  page,
}) => {
  const response = await page.goto('./work/this-project-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'This route ends here.' })
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to work' }).click();
  await expect(page.locator('.work-index article')).toHaveCount(4);
});
