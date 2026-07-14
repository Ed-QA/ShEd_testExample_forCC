import { expect, test } from '@playwright/test';

const pages = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/contact',
  '/checkout',
  '/privacy',
  '/rentals'
];

for (const path of pages) {
  test(`main page renders visible content: ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('domcontentloaded');
    await expect.soft(page.locator('body')).toBeVisible();
    await expect.soft(page.locator('body')).not.toBeEmpty();
    await expect.soft(page.locator('a, button').first()).toBeVisible();
  });
}
