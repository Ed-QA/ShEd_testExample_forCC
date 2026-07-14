import { expect, test } from '@playwright/test';
import { HomePage } from '../../src/pages/home-page';
import { ProductPage } from '../../src/pages/product-page';

test('product detail opens from listing and supports quantity/cart action', async ({ page }, testInfo) => {
  const home = new HomePage(page, testInfo);
  const product = new ProductPage(page, testInfo);
  await home.goto();
  const listingName = await home.openFirstProduct();
  await product.expectLoaded();
  await expect.soft(page.locator('body')).toContainText(listingName.split(' ')[0]);
  await product.setQuantity('1');
  await product.addToCart();
  await product.expectCartFeedback();
});
