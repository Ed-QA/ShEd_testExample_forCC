import { expect, type Page, type TestInfo } from '@playwright/test';
import { BasePage } from './base-page';
import type { TestUser } from '../fixtures/test-data';

export class CheckoutPage extends BasePage {
  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async continueAsGuestIfShown(): Promise<void> {
    const guest = this.page.getByRole('link', { name: /continue as guest/i }).or(this.page.locator('a[href="#guest-tab"]')).first();
    if (await guest.isVisible().catch(() => false)) {
      await guest.click();
    }
  }

  async proceedFromCart(): Promise<void> {
    await this.safeClick(this.byTestId('proceed-1'), 'Cart proceed button should be clickable');
  }

  async continueAsGuest(user: TestUser): Promise<void> {
    await this.continueAsGuestIfShown();
    await this.safeFill(this.byTestId('guest-email'), user.email, 'Guest email should be fillable');
    await this.safeFill(this.byTestId('guest-first-name'), user.firstName, 'Guest first name should be fillable');
    await this.safeFill(this.byTestId('guest-last-name'), user.lastName, 'Guest last name should be fillable');
    await this.safeClick(this.byTestId('guest-submit'), 'Guest continue submit should be clickable');
  }

  async proceedFromGuestSummary(): Promise<void> {
    await this.safeClick(this.byTestId('proceed-2-guest'), 'Guest summary proceed button should be clickable');
  }

  async next(): Promise<void> {
    await this.safeClick(
      this.page.locator('button:visible[data-test^="proceed"], button:visible[data-test="finish"], input:visible[type="submit"]').first(),
      'Checkout next/continue should be clickable'
    );
  }

  async expectBillingCannotProceedEmpty(): Promise<void> {
    await expect.soft(this.page.locator('button:visible[data-test="proceed-3"]')).toBeDisabled();
  }

  async fillBillingAddress(user: TestUser): Promise<void> {
    await this.safeSelect(this.byTestId('country'), user.country, 'Billing country should be selectable');
    await this.safeFill(this.byTestId('postal_code'), user.postcode, 'Billing postcode should be fillable');
    await this.safeFill(this.byTestId('house_number'), user.houseNumber, 'Billing house number should be fillable');
    await this.safeFill(this.byTestId('street'), user.address, 'Billing street/address should be fillable');
    await this.safeFill(this.byTestId('city'), user.city, 'Billing city should be fillable');
    await this.safeFill(this.byTestId('state'), user.state, 'Billing state should be fillable');
  }

  async selectPaymentMethod(method: RegExp | string): Promise<void> {
    const pattern = typeof method === 'string' ? new RegExp(method, 'i') : method;
    const combo = this.page.locator('select:visible[data-test="payment-method"]');
    await expect(combo).toBeVisible();
    const options = await combo.locator('option').allTextContents();
    const match = options.find((option) => pattern.test(option));
    if (match) {
      await combo.selectOption({ label: match });
      await this.page.waitForTimeout(300);
      return;
    }

    await this.issues.add(`Payment method ${pattern} should be selectable`, `Available options: ${options.join(', ')}`);
  }

  async fillCreditCard(data: { cardNumber: string; expirationDate: string; cvv: string; cardHolder: string }): Promise<void> {
    await this.safeFill(this.byTestId('credit_card_number'), data.cardNumber, 'Credit card number should be fillable');
    await this.safeFill(this.byTestId('expiration_date'), data.expirationDate, 'Credit card expiration should be fillable');
    await this.safeFill(this.byTestId('cvv'), data.cvv, 'Credit card CVV should be fillable');
    await this.safeFill(this.byTestId('card_holder_name'), data.cardHolder, 'Card holder should be fillable');
  }

  async expectValidationErrors(): Promise<void> {
    await expect.soft(this.page.locator('.invalid-feedback, .alert-danger, [role="alert"], .error').first()).toBeVisible();
  }
}
