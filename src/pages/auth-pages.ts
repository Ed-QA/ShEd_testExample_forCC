import { expect, type Page, type TestInfo } from '@playwright/test';
import { BasePage } from './base-page';
import type { TestUser } from '../fixtures/test-data';

export class RegisterPage extends BasePage {
  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/register', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async submitEmpty(): Promise<void> {
    await this.safeClick(this.byTestId('register-submit'), 'Register submit button should be clickable');
  }

  async register(user: TestUser): Promise<void> {
    await this.goto();
    await this.safeFill(this.byTestId('first-name'), user.firstName, 'First name should be fillable');
    await this.safeFill(this.byTestId('last-name'), user.lastName, 'Last name should be fillable');
    await this.safeFill(this.byTestId('dob'), user.dob, 'Date of birth should be fillable');
    await this.safeSelect(this.byTestId('country'), user.country, 'Country should be selectable');
    await this.safeFill(this.byTestId('postal_code'), user.postcode, 'Postcode should be fillable');
    await this.safeFill(this.byTestId('house_number'), user.houseNumber, 'House number should be fillable');
    await this.safeFill(this.byTestId('street'), user.address, 'Street should be fillable');
    await this.safeFill(this.byTestId('city'), user.city, 'City should be fillable');
    await this.safeFill(this.byTestId('state'), user.state, 'State should be fillable');
    await this.safeFill(this.byTestId('phone'), user.phone, 'Phone should be fillable');
    await this.safeFill(this.byTestId('email'), user.email, 'Email should be fillable');
    await this.safeFill(this.byTestId('password'), user.password, 'Password should be fillable');
    await this.safeClick(this.byTestId('register-submit'), 'Register submit should work');
  }

  async expectRegistrationOutcome(): Promise<void> {
    await expect.soft(
      this.page.getByText(/success|login|sign in|account/i).or(this.page.locator('.alert, .toast, [role="alert"]')).first()
    ).toBeVisible();
  }
}

export class LoginPage extends BasePage {
  constructor(page: Page, testInfo: TestInfo) {
    super(page, testInfo);
  }

  async goto(): Promise<void> {
    await this.page.goto('/auth/login', { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async login(email: string, password: string): Promise<void> {
    await this.goto();
    await this.safeFill(this.byTestId('email'), email, 'Login email should be fillable');
    await this.safeFill(this.byTestId('password'), password, 'Login password should be fillable');
    await this.safeClick(this.byTestId('login-submit'), 'Login submit should be clickable');
  }

  async submitEmpty(): Promise<void> {
    await this.goto();
    await this.safeClick(this.byTestId('login-submit'), 'Login submit should be clickable');
  }

  async expectLoggedIn(): Promise<void> {
    await expect.soft(this.page.getByRole('link', { name: /account|profile|my account|logout/i }).or(this.page.locator('[data-test*="nav-menu"]')).first()).toBeVisible();
  }
}
