import { expect, Locator, Page } from '@playwright/test';
import { softCheck } from './assert';
import { log } from '../logger';

export async function verifyProducts(page: Page, expectedProducts: any[], selector = '.product-item') {
  const errors: string[] = [];
  const items = page.locator(selector);

  await softCheck(
    () => expect(items).toHaveCount(expectedProducts.length),
    `Total products matching "${selector}" should be ${expectedProducts.length}`,
    errors
  );

  for (let i = 0; i < expectedProducts.length; i++) {
    await verifyProductItem(items.nth(i), expectedProducts[i], i, errors);
  }

  if (errors.length > 0) {
    throw new Error(`Product verification failed:\n${errors.join('\n')}`);
  }
}

export async function verifyProductItem(
  itemLocator: Locator,
  product: { name: string; price: string; hasAddToCart?: boolean },
  index: number,
  errors: string[]
) {
  log.section(`✔ Verifying: ${product.name}`);

  await softCheck(
    () => expect(itemLocator.locator('h2')).toHaveText(product.name),
    `Product #${index + 1}: name should be "${product.name}"`,
    errors
  );

  await softCheck(
    () => expect(itemLocator.locator('.prices')).toHaveText(product.price),
    `Product "${product.name}": price should be "${product.price}"`,
    errors
  );

  if (product.hasAddToCart) {
    await softCheck(
      () => expect(itemLocator.locator('text=Add to cart')).toBeVisible(),
      `Product "${product.name}": "Add to cart" button should be visible`,
      errors
    );
  }
}
