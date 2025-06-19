import { Page, expect } from '@playwright/test';
import { softCheck } from '../support/utils/assert';

/**
 * Soft-checks that the product grid is visible on the page.
 */
export async function expectProductGridVisible(page: Page, errors: string[]) {
  await softCheck(
    () => expect(page.locator('.product-grid')).toBeVisible(),
    'Product grid should be visible on the page',
    errors
  );
}