import { expect, test } from "@playwright/test";
import { RegisterPage } from "../../pages/RegisterPage";
import { faker } from "@faker-js/faker";

test.describe("Register flow", () => {
  test("Should register successfully with valid credentials", async ({ page }) => {
    const registerPage = new RegisterPage(page);

    const fakerEmail = faker.internet.email();
    const fakerPassword = faker.internet.password();

    await registerPage.goto();

    await registerPage.fillRegister(
      "Ariel",
      "Geer",
      fakerEmail,
      fakerPassword,
      fakerPassword
    );

    await expect(page.locator('.result')).toHaveText('Your registration completed');
  });
});
