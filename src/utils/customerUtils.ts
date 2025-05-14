import type { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { customerId, customerVersion } from '@/data/constants';

export function createCustomerDraft(
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  street: string,
  city: string,
  postalCode: string,
  country: string,
  email: string,
  password: string,
  useAsDefaultAddress: boolean
): CustomerDraft {
  return {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth,
    addresses: [
      {
        streetName: street,
        city,
        postalCode,
        country,
      },
    ],
    defaultShippingAddress: useAsDefaultAddress ? 0 : undefined,
    defaultBillingAddress: useAsDefaultAddress ? 0 : undefined,
    isEmailVerified: true,
  };
}
export function normalizeInput(userInput: string): string {
  return userInput.trim();
}
export function saveToSessionStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}
export function saveLoggedInUserToSessionStorage(customer: Customer): void {
  saveToSessionStorage(customerId, customer.id);
  saveToSessionStorage(customerVersion, `${customer.version}`);
}
