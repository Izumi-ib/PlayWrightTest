import { Page, expect } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/register");
  }

  async fillRegister(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    await this.page.click("#gender-male");
    await this.page.fill("#FirstName", firstName);
    await this.page.fill("#LastName", lastName);
    await this.page.fill("#Email", email);
    await this.page.fill("#Password", password);
    await this.page.fill("#ConfirmPassword", confirmPassword);
    await this.page.click("#register-button");
  }
}
