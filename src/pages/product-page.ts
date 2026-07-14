import { expect, type Page, type TestInfo } from '@playwright/test';
import { BasePage } from './base-page';

export class ProductPage extends BasePage {
  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
  }

  async expectLoaded(): Promise<void> {
    await this.expectVisible(this.page.locator('app-detail, h1, .card').first(), 'Product detail content should be visible');
  }

  async setQuantity(quantity: string): Promise<void> {
    const input = this.byTestId('quantity').or(this.page.locator('input[type="number"]')).first();
    if (await input.isVisible().catch(() => false)) {
      await input.fill(quantity);
    }
  }

  async increaseQuantity(): Promise<void> {
    await this.safeClick(this.byTestId('increase-quantity'), 'Quantity increase should be clickable');
  }

  async addToCart(): Promise<void> {
    const clicked = await this.safeClick(this.byTestId('add-to-cart'), 'Add to cart should be clickable');
    if (clicked) {
      await expect.soft(this.page.locator('[data-test="cart-quantity"], #lblCartCount').first()).toBeVisible();
    }
  }

  async expectCartFeedback(): Promise<void> {
    await expect.soft(this.page.getByText(/cart|added|success/i).or(this.page.locator('.alert, .toast, [role="alert"]')).first()).toBeVisible();
  }
}
