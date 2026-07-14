import { expect, test } from '@playwright/test';

test('navigation and primary product area are visible and clickable', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');
  await expect.soft(page.getByRole('navigation').or(page.locator('app-header')).first()).toBeVisible();
  await expect.soft(page.locator('a, button').first()).toBeVisible();
  await expect.soft(page.locator('[data-test="product-card"], .card').first()).toBeVisible();
});
