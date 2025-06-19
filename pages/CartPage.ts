import { expect, Locator, Page } from '@playwright/test';
import { softCheck } from '../support/utils/assert';
import { log } from '../support/logger';

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/cart');
  }

  async verifyCartItem(expected: { name: string; price: string; quantity: string }, errors: string[]) {
    await softCheck(
      () => expect(this.page.locator('.product-name')).toHaveText(expected.name),
      `Cart item should have name "${expected.name}"`,
      errors
    );

    await softCheck(
      () => expect(this.page.locator('.product-unit-price')).toHaveText(expected.price),
      `Cart item should have price "${expected.price}"`,
      errors
    );

    await softCheck(
      () => expect(this.page.locator('.qty-input')).toHaveValue(expected.quantity),
      `Quantity for "${expected.name}" should be "${expected.quantity}"`,
      errors
    );
  }

  async checkAgreeTermsOfService() {
  const checkTermsOfService = this.page.locator('#termsofservice');

  if (!(await checkTermsOfService.isChecked())) {
    await checkTermsOfService.click();
    log.info('Checked "Terms of Service" box');
  } else {
    log.info('"Terms of Service" was already checked');
  }
}

  async proceedToCheckout() {
    await this.page.locator('#checkout').click();
  }
}
