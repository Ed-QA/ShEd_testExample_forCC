import { expect, test } from '@playwright/test';
import { HomePage } from '../../src/pages/home-page';

test('language selector can be used without breaking main navigation', async ({ page }, testInfo) => {
  const home = new HomePage(page, testInfo);
  await home.goto();
  await home.switchLanguage();
  await expect.soft(page.locator('body')).toBeVisible();
  await expect.soft(page.getByRole('navigation').or(page.locator('app-header')).first()).toBeVisible();
});
