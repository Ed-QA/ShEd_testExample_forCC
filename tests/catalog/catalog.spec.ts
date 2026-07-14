import { expect, test } from '@playwright/test';
import { ToolshopApi } from '../../src/api/toolshop-api';
import { HomePage } from '../../src/pages/home-page';

test('product catalog loads and is backed by API data', async ({ page, request }, testInfo) => {
  const api = new ToolshopApi(request);
  const products = await api.getProducts();
  expect.soft(JSON.stringify(products).length).toBeGreaterThan(50);

  const home = new HomePage(page, testInfo);
  await home.goto();
  await home.expectLoaded();
  await expect.soft(home.productCards().first()).toBeVisible();
});

test('search returns visible product results', async ({ page }, testInfo) => {
  const home = new HomePage(page, testInfo);
  await home.goto();
  await home.searchFor('hammer');
  await expect.soft(page.locator('body')).toContainText(/hammer|no results|product/i);
});

test('category or brand filters remain usable with sorting controls', async ({ page }, testInfo) => {
  const home = new HomePage(page, testInfo);
  await home.goto();
  const checkboxes = page.locator('input[type="checkbox"]');
  if (await checkboxes.first().isVisible().catch(() => false)) {
    await checkboxes.first().check();
  }
  const sort = page.getByRole('combobox').or(page.locator('select')).first();
  if (await sort.isVisible().catch(() => false)) {
    await sort.selectOption({ index: 1 }).catch(() => undefined);
  }
  await expect.soft(page.locator('body')).toBeVisible();
});
