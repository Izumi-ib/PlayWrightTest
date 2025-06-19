import { expect, Page } from '@playwright/test';

export async function clickContinue(page: Page) {
  const continueBtn = page.getByRole('button', { name: 'Continue' });
  
  await expect(continueBtn).toBeVisible({ timeout: 5000 });
  await expect(continueBtn).toBeEnabled();
  await continueBtn.click();
}