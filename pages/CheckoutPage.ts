import { Page } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async clickContinueAsGuestButton() {
    await this.page.locator('text=Checkout as Guest').click();
  }

  
}
