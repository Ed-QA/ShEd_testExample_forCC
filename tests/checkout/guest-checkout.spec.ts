import { test } from '@playwright/test';
import { CartPage } from '../../src/pages/cart-page';
import { CheckoutPage } from '../../src/pages/checkout-page';
import { HomePage } from '../../src/pages/home-page';
import { ProductPage } from '../../src/pages/product-page';
import { uniqueUser } from '../../src/fixtures/test-data';

test('guest checkout reaches billing address and validates required fields', async ({ page }, testInfo) => {
  const home = new HomePage(page, testInfo);
  const product = new ProductPage(page, testInfo);
  const cart = new CartPage(page, testInfo);
  const checkout = new CheckoutPage(page, testInfo);

  await home.goto();
  await home.openFirstProduct();
  await product.addToCart();
  await cart.goto();
  await cart.expectHasItem();
  const user = uniqueUser('shed.guest');
  await checkout.proceedFromCart();
  await checkout.continueAsGuest(user);
  await checkout.proceedFromGuestSummary();
  await checkout.expectBillingCannotProceedEmpty();
  await checkout.fillBillingAddress(user);
  await checkout.next();
});
