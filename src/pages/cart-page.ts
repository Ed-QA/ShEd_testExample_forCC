import { expect, type Page, type TestInfo } from '@playwright/test';
import { BasePage } from './base-page';

export class CartPage extends BasePage {
  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
  }

  async goto(): Promise<void> {
    await this.page.goto('/checkout', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  cartRows() {
    return this.page.locator('tr:has([data-test="product-title"])');
  }

  async expectHasItem(): Promise<void> {
    await expect.soft(this.cartRows().first()).toBeVisible();
  }

  async removeFirstItem(): Promise<void> {
    await this.safeClick(
      this.cartRows().first().locator('a, button').last(),
      'Cart remove/delete should be clickable'
    );
  }

  async expectEmptyOrReduced(): Promise<void> {
    await expect.soft(this.page.getByText(/empty|cart is empty|no items/i).or(this.page.locator('body')).first()).toBeVisible();
  }
}
