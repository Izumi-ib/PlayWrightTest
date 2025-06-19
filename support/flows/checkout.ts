import { Page, test } from '@playwright/test';
import { clickContinue } from '../utils/navigation';
import { log } from '../../support/logger';

export async function proceedThroughCheckout(page: Page) {
  await test.step('Continue from shipping address', async () => {
    await clickContinue(page);
    log.info('Continued from shipping address');
  });

  await test.step('Select shipping method and continue', async () => {
    await page.locator('input[type="radio"][name="shippingoption"]').first().check();
    log.info('Shipping method selected');
    await clickContinue(page);
  });

  await test.step('Select payment method and continue', async () => {
    await page.locator('input[type="radio"][name="paymentmethod"]').first().check();
    log.info('Payment method selected');
    await clickContinue(page);
  });

  await test.step('Continue from payment info', async () => {
    await clickContinue(page);
    log.info('Continued from payment info');
  });


  await test.step('Click confirm order', async () => {
    await page.getByRole('button', { name: 'Confirm' }).click();
    log.info('Clicked confirm order');
  });
}