import { expect, test } from '@playwright/test';
import { RegisterPage } from '../../src/pages/auth-pages';
import { invalidUser, uniqueUser } from '../../src/fixtures/test-data';

test('registration validates required fields and malformed input', async ({ page }, testInfo) => {
  const register = new RegisterPage(page, testInfo);
  await register.goto();
  await register.submitEmpty();
  await expect.soft(page.locator('.invalid-feedback, .alert-danger, [role="alert"], .error').first()).toBeVisible();

  await page.locator('[data-test="email"]').fill(invalidUser.email);
  await page.locator('[data-test="password"]').fill(invalidUser.password);
  await register.submitEmpty();
  await expect.soft(page.locator('.invalid-feedback, .alert-danger, [role="alert"], .error').first()).toBeVisible();
});

test('registration accepts a unique valid user', async ({ page }, testInfo) => {
  const register = new RegisterPage(page, testInfo);
  await register.register(uniqueUser('shed.registration'));
  await register.expectRegistrationOutcome();
});
