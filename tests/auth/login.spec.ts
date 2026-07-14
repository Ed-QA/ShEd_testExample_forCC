import { expect, test } from '@playwright/test';
import { LoginPage, RegisterPage } from '../../src/pages/auth-pages';
import { uniqueUser } from '../../src/fixtures/test-data';

test('login validates required fields and invalid credentials', async ({ page }, testInfo) => {
  const login = new LoginPage(page, testInfo);
  await login.submitEmpty();
  await expect.soft(page.locator('.invalid-feedback, .alert-danger, [role="alert"], .error').first()).toBeVisible();

  await login.login('missing-user@example.com', 'WrongPassword!2026');
  await expect.soft(page.getByText(/invalid|wrong|not found|error/i).or(page.locator('.alert, [role="alert"]')).first()).toBeVisible();
});

test('created user can login', async ({ page }, testInfo) => {
  const user = uniqueUser('shed.login');
  await new RegisterPage(page, testInfo).register(user);
  const login = new LoginPage(page, testInfo);
  await login.login(user.email, user.password);
  await login.expectLoggedIn();
});
