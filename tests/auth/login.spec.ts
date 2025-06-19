import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Login flow', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('User should login successfully', async ({ page }) => {
    await loginPage.fillLoginForm('sirena@gmail.com', '1234567890', true);

    await expect(page.getByText('sirena@gmail.com'), 'The login success validation has failed').toBeVisible();
    await expect(page.locator('.ico-logout')).toHaveText('Log out');
  });

  test('User logins with invalid credentials and validates the error message', async ({ page }) => {
    await loginPage.fillLoginForm('sirena@gmail.com', 'wrong-password', true);

    await expect(page.locator('.validation-summary-errors')).toContainText('Login was unsuccessful');
  });
});
