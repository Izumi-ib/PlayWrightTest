import { Page,test } from '@playwright/test';
import { log } from '../../logger';
import { clickContinue } from '../navigation';

export type BillingData = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  country: string;
  stateProvince: string;
  city: string;
  address1: string;
  address2: string;
  zipPostalCode: string;
  phoneNumber: string;
  faxNumber: string;
};

export async function fillBillingAddressForm(page: Page, data: BillingData) {
  const fieldSelectors = {
    firstName: '#BillingNewAddress_FirstName',
    lastName: '#BillingNewAddress_LastName',
    email: '#BillingNewAddress_Email',
    company: '#BillingNewAddress_Company',
    country: '#BillingNewAddress_CountryId',
    stateProvince: '#BillingNewAddress_StateProvinceId',
    city: '#BillingNewAddress_City',
    address1: '#BillingNewAddress_Address1',
    address2: '#BillingNewAddress_Address2',
    zipPostalCode: '#BillingNewAddress_ZipPostalCode',
    phoneNumber: '#BillingNewAddress_PhoneNumber',
    faxNumber: '#BillingNewAddress_FaxNumber',
  };

  for (const [key, value] of Object.entries(data)) {
    const selector = fieldSelectors[key as keyof BillingData];
    const field = page.locator(selector);

    if (key === 'country' || key === 'stateProvince') {
      await field.selectOption({ label: value });
    } else {
      await field.fill(value);
    }
  }
}

export async function billingStep(page: Page, billingData: BillingData) {
  await test.step('Fill billing address form', async () => {
    await fillBillingAddressForm(page, billingData);
    log.info(`Billing address form filled`);
    await clickContinue(page);
  });
}
