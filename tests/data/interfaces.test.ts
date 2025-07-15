import type { RegistrationFormItems } from '@/data/interfaces';
import { countries, currencies, languages } from '@/data/interfaces';

describe('Constants and Interfaces', () => {
  test('Countries list should contain expected entries', () => {
    expect(countries).toContainEqual({ code: 'KG', name: 'Kyrgyzstan' });
    expect(countries).toContainEqual({ code: 'US', name: 'United States' });
  });

  test('Currencies list should contain expected entries', () => {
    expect(currencies).toContainEqual({ code: 'USD', name: 'US Dollar', symbol: '$' });
  });

  test('Languages list should contain expected entries', () => {
    expect(languages).toContainEqual({ code: 'en', name: 'English (United States)', locale: 'en-US' });
  });

  test('RegistrationFormItems should have correct fields', () => {
    const formItems: RegistrationFormItems = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1990-01-01',
      street: 'Main St',
      city: 'New York',
      postalCode: '12345',
      countryName: 'United States',
      email: 'john@example.com',
      password: 'securepassword',
      useSameAddress: false,
      shippingStreet: 'Shipping St',
      shippingCity: 'LA',
      shippingPostalCode: '54321',
      shippingCountry: 'United States',
    };
    expect(formItems.firstName).toBe('John');
    expect(formItems.city).toBe('New York');
    expect(formItems.shippingCity).toBe('LA');
    expect(formItems.useSameAddress).toBe(false);
  });
});
