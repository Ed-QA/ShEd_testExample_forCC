import { expect, type Page, type TestInfo } from '@playwright/test';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectLoaded(): Promise<void> {
    await this.expectVisible(this.page.getByRole('navigation').or(this.page.locator('app-header')).first(), 'Main navigation should be visible');
    await this.expectVisible(this.page.locator('app-overview, .container, main, body').first(), 'Home page content should be visible');
  }

  async openLogin(): Promise<void> {
    await this.safeClick(
      this.page.getByRole('link', { name: /sign in|login/i }).or(this.page.locator('[data-test*="nav"][data-test*="signin"], [routerlink*="login"]')).first(),
      'Login navigation should be clickable'
    );
  }

  async openRegister(): Promise<void> {
    await this.page.goto('/auth/register', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  productCards() {
    return this.page.locator('a[data-test^="product-"]').filter({ has: this.page.locator('[data-test="product-name"]') });
  }

  async openFirstProduct(): Promise<string> {
    const cards = this.productCards();
    await expect(cards.first()).toBeVisible();
    const name = (await cards.first().locator('[data-test="product-name"]').innerText()).trim();
    await cards.first().click();
    await this.page.waitForLoadState('domcontentloaded');
    return name;
  }

  async searchFor(term: string): Promise<void> {
    const search = this.byTestId('search-query').or(this.page.getByPlaceholder(/search/i)).first();
    await this.safeFill(search, term, 'Search input should accept text');
    await this.safeClick(this.byTestId('search-submit'), 'Search button should be clickable');
  }

  async switchLanguage(): Promise<void> {
    await this.safeClick(this.byTestId('language-select'), 'Language selector should be clickable');
    const french = this.byTestId('lang-fr');
    if (await french.isVisible().catch(() => false)) await french.click();
  }
}
