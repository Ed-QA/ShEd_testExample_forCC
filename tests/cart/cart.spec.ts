import { test } from '@playwright/test';
import { CartPage } from '../../src/pages/cart-page';
import { HomePage } from '../../src/pages/home-page';
import { ProductPage } from '../../src/pages/product-page';

test('cart supports add, reload verification, and remove', async ({ page }, testInfo) => {
  const home = new HomePage(page, testInfo);
  const product = new ProductPage(page, testInfo);
  const cart = new CartPage(page, testInfo);

  await home.goto();
  await home.openFirstProduct();
  await product.addToCart();
  await cart.goto();
  await cart.expectHasItem();

  await page.reload();
  await cart.expectHasItem();

  await cart.removeFirstItem();
  await cart.expectEmptyOrReduced();
});
