import { expect, Page, test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { log } from '../../support/logger';


test.describe('', async () => {
  test('@e2e Unauthorized user is redirected from profile page', async ({ page }) => {
    allure.owner('Baiastan');
    allure.severity('critical');
    allure.epic('Authorization');
    allure.feature('Protected Routes');
    allure.story('Guest users are redirected to login page when accessing profile');

    await test.step('Navigate to protected profile page as guest', async () => {
      log.info('Opening /customer/info without authentication');
      await page.goto('https://demowebshop.tricentis.com/customer/info');
      await expect(page).toHaveURL('/login');
    });

    await test.step('Validate login form is visible', async () => {
      log.info('Checking for login form fields');
      await expect(page.locator('#Email')).toBeVisible();
      await expect(page.locator('#Password')).toBeVisible();
      await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    });
  });
});
