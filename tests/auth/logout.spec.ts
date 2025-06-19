import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { Header } from '../../components/Header';

test.describe('Logout flow', () => {
  let loginPage: LoginPage;
  let header: Header;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    header = new Header(page);
  });

  test('User should logout and see the log in link', async ({ page }) => {
    await loginPage.goto();
    await loginPage.fillLoginForm('sirena@gmail.com', '1234567890', true);

    await expect(page.getByText('sirena@gmail.com'), 'The login success validation has failed').toBeVisible();
    await expect(page.locator('.ico-logout')).toHaveText('Log out');

    await header.logout();
    await header.assertLoggedOut();
  });
});
