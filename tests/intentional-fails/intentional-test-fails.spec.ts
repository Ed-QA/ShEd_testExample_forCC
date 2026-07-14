import { expect, test } from '@playwright/test';

test.describe('Intentional test fails', () => {
  test('button click result: expects cart count without adding a product', async ({ page }) => {
    await page.goto('/');

    await page.getByTestId('search-query').fill('hammer');
    await page.getByTestId('search-submit').click();

    await expect(page.locator('body')).toContainText('No products should ever load after search');
  });

  test('wrong text: expects an incorrect product name on the home page', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('product-name').first()).toHaveText('CC QA Demo Tool');
  });

  test('absent element: expects a fake support escalation banner', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByTestId('fake-support-escalation-banner')).toBeVisible();
  });
});
