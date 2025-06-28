import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

import users from '../../test-data/users.json';

test.describe('Login flow', () => {
  let loginPage: LoginPage;

  const userEmail = users.validUser.email;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('User should login successfully', async ({ page }) => {
    await loginPage.loginWith(userEmail, users.validUser.password, true);

    await expect(page.getByText(userEmail), 'The login success validation has failed').toBeVisible();
    await expect(page.locator('.ico-logout')).toHaveText('Log out');
  });

  test('User logins with invalid credentials and validates the error message', async ({ page }) => {
    await loginPage.loginWith(userEmail, 'wrong-password', true);

    await expect(page.locator('.validation-summary-errors')).toContainText('Login was unsuccessful');
  });
});
