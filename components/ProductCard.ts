import { Locator, Page, expect } from '@playwright/test';

export class ProductCard {
  constructor(private readonly page: Page) {}

  getByName(name: string): Locator {
    return this.page.locator('.product-item').filter({ hasText: name });
  }

  async clickAddToCart(product: Locator) {
    await expect(product.locator('text=Add to cart')).toBeVisible();
    await product.locator('text=Add to cart').click();
  }
}
