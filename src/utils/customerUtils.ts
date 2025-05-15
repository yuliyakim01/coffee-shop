import type { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { customerId, customerVersion } from '@/data/constants';
import type { Country } from '@/data/interfaces';
import { countries } from '@/data/interfaces';

export function createCustomerDraft(
  firstName: string,
  lastName: string,
  dateOfBirth: string,
  street: string,
  city: string,
  postalCode: string,
  countryName: string,
  email: string,
  password: string,
  useAsDefaultAddress: boolean
): CustomerDraft {
  const country: string = normalizeCountryInput(countryName);
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
export function normalizeCountryInput(countryName: string): string {
  const match: Country | undefined = countries.find(
    (country: Country): boolean => country.name.toLowerCase() === countryName.trim().toLowerCase()
  );
  return match ? match.code : 'GE';
}
export function normalizeInput(userInput: string): string {
  return userInput.trim();
}
export function saveToSessionStorage(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}
export function saveLoggedInUserToSessionStorage(customer: Customer): void {
  saveToSessionStorage(customerId, customer.id);
  saveToSessionStorage(customerVersion, `${customer.version}`);
}
