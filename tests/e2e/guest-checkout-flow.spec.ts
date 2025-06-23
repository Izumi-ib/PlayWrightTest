import { expect, test } from '@playwright/test';

import { HomePage } from '../../pages/HomePage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { ProductCard } from '../../components/ProductCard';
import { expectProductGridVisible } from '../../components/ProductGrid';

import productsHome from '../../test-data/products-home.json';
import billingData from '../../test-data/billing-data.json';

import { log } from '../../support/logger';
import { verifyProducts } from '../../support/utils/product-checker';
import { billingStep, fillBillingAddressForm } from '../../support/utils/form-fillers/billing-form';
import { clickContinue } from '../../support/utils/navigation';
import { proceedThroughCheckout } from '../../support/flows/checkout';
import { allure } from 'allure-playwright';

test.describe('E2E: Guest Checkout Flow', () => {
  test('@e2e @guest should allow guest to order a product successfully ', async ({ page }) => {
    allure.owner('Baiastan');
    allure.severity('critical');
    allure.epic('Checkout');
    allure.feature('Guest Checkout');
    allure.story('Add product and complete order without login');

    const product = productsHome[1].name;
    const billing = billingData[0];

    const homePage = new HomePage(page);
    const productCard = new ProductCard(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const errors: string[] = [];

    await test.step('Open homepage and verify product grid', async () => {
      log.info(`Opened home page`);
      homePage.goto();

      await expectProductGridVisible(page, errors);
      await verifyProducts(page, productsHome);
    });

    await test.step('Add product to cart from homepage', async () => {
      const item = productCard.getByName(product);
      await expect(item).toBeVisible();
      await productCard.clickAddToCart(item);
      log.info(`Product "${product}" added to cart`);

      await expect(page.locator('.content')).toHaveText('The product has been added to your shopping cart');
    });

    await test.step('Open cart and verify added product', async () => {
      log.info(`Opened cart page`);
      cartPage.goto();

      await cartPage.verifyCartItem(
        {
          name: product,
          price: productsHome[1].price,
          quantity: '1',
        },
        errors
      );
    });

    await test.step('Agree to terms and proceed to checkout as guest', async () => {
      await cartPage.checkAgreeTermsOfService();
      await cartPage.proceedToCheckout();
      log.info(`Proceeding to checkout`);

      await checkoutPage.clickContinueAsGuestButton();
      log.info(`Proceeding to checkout as guest`);
    });

    await billingStep(page, billing);

    await test.step('Complete checkout flow (shipping, payment, confirm)', async () => {
      await proceedThroughCheckout(page);
    });

    await test.step('Verify order confirmation message', async () => {
      await page.waitForURL('**/checkout/completed/');

      const confirmation = page.locator('.section > .title');
      await expect(confirmation).toContainText('Your order has been successfully processed!');

      log.info('Order confirmation message verified.');
    });
    log.info(`Order confirmed successfully`);
    expect(errors).toEqual([]);
  });
});
