import { expect, Page, test } from '@playwright/test';
import { allure } from 'allure-playwright';
import { log } from '../../support/logger';

import { LoginPage } from '../../pages/LoginPage';


import users from '../../test-data/users.json';

test.describe('E2E: Auth Session', () => {
  test('@e2e Authenticated user sees profile and logout', async ({ page }) => {
    allure.owner('Baiastan');
    allure.severity('critical');
    allure.epic('Authentication');
    allure.feature('Login Flow');
    allure.story('Valid login leads to profile page with active session');

    const loginPage = new LoginPage(page);

    const userValidEmail = users.validUser.email;

    await test.step('Open login page', async () => {
      log.info('Navigating to login page');

      await loginPage.goto();
      await expect(page).toHaveURL('https://demowebshop.tricentis.com/login');
    });

    await test.step('Enter valid credentials and submit the form', async () => {
      log.info('Filling in credentials and submitting the form');

      await loginPage.loginWith(userValidEmail, users.validUser.password, true);
    });

    await test.step('Validate successful login and session state', async () => {
      log.info('Checking for profile name and logout button');

      await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
      await expect(page.getByText(userValidEmail), 'User email is not visible').toBeVisible();
      await expect(page.getByText('Log out'), 'Logout button is missing').toBeVisible();
    });
  });

  
});
