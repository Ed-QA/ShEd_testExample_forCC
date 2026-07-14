import { test } from '@playwright/test';
import { LoginPage, RegisterPage } from '../../src/pages/auth-pages';
import { CartPage } from '../../src/pages/cart-page';
import { CheckoutPage } from '../../src/pages/checkout-page';
import { HomePage } from '../../src/pages/home-page';
import { ProductPage } from '../../src/pages/product-page';
import { paymentData, uniqueUser } from '../../src/fixtures/test-data';

test('full user journey: register, login, add product, checkout path', async ({ page }, testInfo) => {
  const user = uniqueUser();
  const register = new RegisterPage(page, testInfo);
  const login = new LoginPage(page, testInfo);
  const home = new HomePage(page, testInfo);
  const product = new ProductPage(page, testInfo);
  const cart = new CartPage(page, testInfo);
  const checkout = new CheckoutPage(page, testInfo);

  await test.step('Register a new account', async () => {
    await register.register(user);
    await register.expectRegistrationOutcome();
  });

  await test.step('Login with the generated account', async () => {
    await login.login(user.email, user.password);
    await login.expectLoggedIn();
  });

  await test.step('Select a product and add it to cart', async () => {
    await home.goto();
    await home.openFirstProduct();
    await product.expectLoaded();
    await product.increaseQuantity();
    await product.addToCart();
    await product.expectCartFeedback();
  });

  await test.step('Verify cart and continue checkout', async () => {
    await cart.goto();
    await cart.expectHasItem();
    await checkout.proceedFromCart();
    await checkout.continueAsGuest(user);
    await checkout.proceedFromGuestSummary();
  });

  await test.step('Fill billing address and payment fields', async () => {
    await checkout.fillBillingAddress(user);
    await checkout.next();
    await checkout.selectPaymentMethod(/credit card|card/i);
    await checkout.fillCreditCard(paymentData.creditCard);
  });
});
