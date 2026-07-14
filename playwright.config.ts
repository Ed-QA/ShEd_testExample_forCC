import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'https://practicesoftwaretesting.com';
const headless = process.env.HEADLESS !== 'false';

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 30_000,
  expect: { timeout: 3_000 },
  fullyParallel: true,
  workers: process.env.WORKERS ?? undefined,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list', { printSteps: true }],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }]
  ],
  use: {
    baseURL,
    headless,
    testIdAttribute: 'data-test',
    actionTimeout: 8_000,
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium-deep',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      testIgnore: /.*\.smoke\.spec\.ts/
    },
    {
      name: 'chromium-smoke',
      use: { ...devices['Desktop Chrome'] },
      testMatch: /.*\.smoke\.spec\.ts/
    },
    {
      name: 'edge-smoke',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      testMatch: /.*\.smoke\.spec\.ts/
    },
    {
      name: 'firefox-smoke',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*\.smoke\.spec\.ts/
    },
    {
      name: 'webkit-smoke',
      use: { ...devices['Desktop Safari'] },
      testMatch: /.*\.smoke\.spec\.ts/
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: /.*\.smoke\.spec\.ts/
    },
    {
      name: 'tablet-safari',
      use: { ...devices['iPad Pro 11'] },
      testMatch: /.*\.smoke\.spec\.ts/
    }
  ]
});
