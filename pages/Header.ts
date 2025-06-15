import { expect, Page } from "@playwright/test";


export class Header {
  constructor(private page: Page) {}

  async logout() {
    await this.page.getByRole('link', { name: 'Log out' }).click();
  }

  async assertLoggedOut() {
    await expect(this.page.getByRole('link', { name: 'Log in' })).toBeVisible();
  }
}