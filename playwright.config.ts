import { defineConfig } from '@playwright/test';

const basePath = (process.env.TEST_BASE_PATH || '').replace(/\/+$/, '');
const baseURL = `http://127.0.0.1:4173${basePath}/`;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    reducedMotion: 'reduce',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run preview',
    url: baseURL,
    timeout: 180000,
    reuseExistingServer: false,
    env: {
      PORT: '4173',
      NEXT_PUBLIC_BASE_PATH: basePath,
      SITE_URL: `https://mayoulong.dev${basePath}`,
    },
  },
});
