import type { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import type { RegistrationFormItems, SessionUser } from '@/data/constants';
import { customerId, customerVersion } from '@/data/constants';
import type { Country, FormRefItem } from '@/data/interfaces';
import { countries } from '@/data/interfaces';

export function processCustomerDraftProps(
  firstNameRef: FormRefItem,
  lastNameRef: FormRefItem,
  dobRef: FormRefItem,
  streetRef: FormRefItem,
  cityRef: FormRefItem,
  postalCodeRef: FormRefItem,
  countryRef: FormRefItem,
  emailRef: FormRefItem,
  passwordRef: FormRefItem,
  useAsDefaultAddress: boolean
): RegistrationFormItems {
  return {
    firstName: firstNameRef.current?.getValue() ?? '',
    lastName: lastNameRef.current?.getValue() ?? '',
    dateOfBirth: dobRef.current?.getValue() ?? '',
    street: streetRef.current?.getValue() ?? '',
    city: cityRef.current?.getValue() ?? '',
    postalCode: postalCodeRef.current?.getValue() ?? '',
    countryName: countryRef.current?.getValue() ?? '',
    email: emailRef.current?.getValue() ?? '',
    password: passwordRef.current?.getValue() ?? '',
    useAsDefaultAddress,
  };
}

export function createCustomerDraft(prop: RegistrationFormItems): CustomerDraft {
  const country: string = normalizeCountryInput(prop.countryName);
  return {
    email: prop.email,
    password: prop.password,
    firstName: prop.firstName,
    lastName: prop.lastName,
    dateOfBirth: prop.dateOfBirth,
    addresses: [
      {
        streetName: prop.street,
        city: prop.city,
        postalCode: prop.postalCode,
        country: country,
      },
    ],
    defaultShippingAddress: prop.useAsDefaultAddress ? 0 : undefined,
    defaultBillingAddress: prop.useAsDefaultAddress ? 0 : undefined,
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

export const getLoggedInUserFromSessionStorage = (): SessionUser | null => {
  const customerIdFromStorage = sessionStorage.getItem(customerId);
  const customerVersionFromStorage = sessionStorage.getItem(customerVersion);

  if (customerIdFromStorage && customerVersionFromStorage) {
    return {
      customerId: customerIdFromStorage,
      customerVersion: customerVersionFromStorage,
    };
  }

  return null;
};
