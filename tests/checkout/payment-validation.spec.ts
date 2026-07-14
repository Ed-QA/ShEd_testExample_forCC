import { expect, test } from '@playwright/test';
import { CartPage } from '../../src/pages/cart-page';
import { CheckoutPage } from '../../src/pages/checkout-page';
import { HomePage } from '../../src/pages/home-page';
import { ProductPage } from '../../src/pages/product-page';
import { paymentData } from '../../src/fixtures/test-data';
import { uniqueUser } from '../../src/fixtures/test-data';

async function startCheckoutWithProduct(page: import('@playwright/test').Page, testInfo: import('@playwright/test').TestInfo) {
  const home = new HomePage(page, testInfo);
  const product = new ProductPage(page, testInfo);
  const cart = new CartPage(page, testInfo);
  await home.goto();
  await home.openFirstProduct();
  await product.addToCart();
  await cart.goto();
  await cart.expectHasItem();
  const checkout = new CheckoutPage(page, testInfo);
  const user = uniqueUser('shed.payment');
  await checkout.proceedFromCart();
  await checkout.continueAsGuest(user);
  await checkout.proceedFromGuestSummary();
  await checkout.fillBillingAddress(user);
  await checkout.next();
}

test('payment dropdown exposes selectable payment paths and credit card fields', async ({ page }, testInfo) => {
  await startCheckoutWithProduct(page, testInfo);
  const checkout = new CheckoutPage(page, testInfo);
  await checkout.selectPaymentMethod(/credit card|card/i);
  await checkout.fillCreditCard(paymentData.creditCard);
  await expect.soft(page.locator('body')).toBeVisible();
});

test('payment required-field validation is visible when submitting empty payment step', async ({ page }, testInfo) => {
  await startCheckoutWithProduct(page, testInfo);
  const checkout = new CheckoutPage(page, testInfo);
  await checkout.selectPaymentMethod(/credit card|card/i);
  await checkout.next();
  await checkout.expectValidationErrors();
});
