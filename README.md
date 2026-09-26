## 🎉 Project Overview

Youlong Ma's personal portfolio, built with Next.js, Tailwind CSS, and original
procedural artwork. The visual direction, **a systems atlas**, develops the
original globe, indigo palette, and connected skills map into an editorial site.

Requires Node.js 22. Uses Next.js 15 with a static export for GitHub Pages.

## Pages and content

- `/`: introduction, featured work, engineering focus, and a short career overview.
- `/work/`: four projects, each with an original vector study.
- `/work/[slug]/`: statically generated project notes and conceptual flows.
- `/about/`: personal background, portrait, toolkit, and optional interactive map.
- `/experience/`: engineering contributions and education along a simple timeline.

Project facts live in `src/lib/data.tsx`; the ordered project narratives, slugs,
and artwork choices live in `src/lib/work.ts`. Career content lives in
`src/lib/experience.ts`. Add a project there and its route, index entry, and
next-project link are generated from the data. Keep claims grounded in documented
work; the artwork is abstract and does not represent actual product screenshots.

The visual system is in `src/styles/globals.css`, original SVG studies in
`src/components/project-art.tsx`, and page metadata in `src/lib/page-metadata.ts`.
The globe is optional, lazy-loaded, sized to its container, and paused offscreen.
Page transitions keep content visible and respect reduced-motion preferences.

## Local development

Run `npm install`, then `npm run dev` and open `http://localhost:3000/`.
No environment file or path edits are required. On Windows PowerShell, use
`npm.cmd` if execution policy blocks `npm.ps1`.

Run `npm run preview` to build and preview the static export, or `npm start`
to preview an existing build. The preview server prints the correct URL,
including the base path saved during the build.

## GitHub Pages

Pushes to `gh-pages` trigger `.github/workflows/nextjs.yml`. The workflow reads
the URL and base path from GitHub Pages settings and passes them into the build:

- Repository URL: `NEXT_PUBLIC_BASE_PATH=/Portfolio` and
  `SITE_URL=https://yma2022.github.io/Portfolio`.
- Custom domain: an empty `NEXT_PUBLIC_BASE_PATH` and
  `SITE_URL=https://mayoulong.dev`.

The same base path is used for Next.js routes, scripts, and public assets.
The build also writes the sitemap and robots file into the uploaded `out/` folder.
`.env.local` is ignored by Git and is not needed in GitHub Actions.

To simulate a repository-path deployment in PowerShell:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = '/Portfolio'
$env:SITE_URL = 'https://yma2022.github.io/Portfolio'
npm.cmd run preview
```

After stopping the preview, remove the overrides before starting local development:

```powershell
Remove-Item Env:NEXT_PUBLIC_BASE_PATH, Env:SITE_URL -ErrorAction SilentlyContinue
```

Base paths are fixed at build time. Rebuild after changing the target URL/path;
the existing export cannot switch paths at runtime. Keep deployment-specific
overrides out of `.env.local` if local development should always run at `/`.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run format:check
npx playwright install chromium
npm test
```

Browser tests build and serve the real static export on port 4173. They cover
six viewport widths, cross-page navigation, nested refreshes, browser history,
keyboard navigation, email disclosure, the skills map, offscreen rendering,
reduced motion, missing optional assets, no-JavaScript content, accessibility,
404 recovery, per-page metadata, sitemap routes, and public asset paths. The suite
requires its own free port 4173 and builds a fresh export. Reports and screenshots are written
to `playwright-report/` and `test-results/`.

Set `TEST_BASE_PATH=/Portfolio` to run the same checks against a subpath export.
Set `PLAYWRIGHT_CHANNEL=chrome` to use an installed Chrome browser instead of
Playwright's bundled Chromium. Both deployment paths are checked on pull requests.

Inter is bundled locally under its included OFL license, and the displayed avatar
is a compressed copy of the original artwork. The skills map is loaded only on
request. Next.js's PostCSS dependency is overridden to patched version 8.5.28;
review this override when upgrading Next.js.

The globe uses precomputed land-particle positions to avoid running geographic
sampling during page load. If `public/world-110m.json` changes, regenerate them
with `node scripts/generate-globe-particles.cjs`.

Current design rationale: [A systems atlas](docs/art-direction.md).
Earlier technical refinement: [Portfolio refinement](docs/portfolio-review.md).
Local visual review captures are kept in the ignored `docs/design/` directory.
