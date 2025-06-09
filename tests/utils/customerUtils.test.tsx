import {
  processCustomerDraftProps,
  createCustomerDraft,
  normalizeCountryInput,
  denormalizeCountryCode,
  saveLoggedInUserToSessionStorage,
  getLoggedInUserFromSessionStorage,
  getIsAuthorizedFromSessionStorage,
  logoutUser,
  isAuthorizedKey,
} from '@/utils/customerUtils';
import { countries, StringFunction, StringOrNull } from '@/data/interfaces';
import { customerId, customerVersion } from '@/data/constants';
import type { FormRefItem } from '@/data/interfaces';

describe('Utility Functions', () => {
  const mockRef = (value: string): FormRefItem => ({
    current: {
      getValue: () => value,
      getError: () => value,
      setValueExternally: () => {},
      triggerValidation: () => {},
      initialValue: null,
      setErrorExternally: () => {},
    },
  });

  describe('processCustomerDraftProps', () => {
    it('should correctly extract values from refs', () => {
      const result = processCustomerDraftProps(
        mockRef('John'),
        mockRef('Doe'),
        mockRef('1990-01-01'),
        mockRef('Main St'),
        mockRef('Berlin'),
        mockRef('10115'),
        mockRef('Germany'),
        mockRef('john@example.com'),
        mockRef('password123'),
        false,
        mockRef('Shipping St'),
        mockRef('Munich'),
        mockRef('80331'),
        mockRef('Germany'),
        true,
        false
      );

      expect(result).toEqual({
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-01-01',
        street: 'Main St',
        city: 'Berlin',
        postalCode: '10115',
        countryName: 'Germany',
        email: 'john@example.com',
        password: 'password123',
        useSameAddress: false,
        shippingStreet: 'Shipping St',
        shippingCity: 'Munich',
        shippingPostalCode: '80331',
        shippingCountry: 'Germany',
        defaultBilling: true,
        defaultShipping: false,
      });
    });
  });

  describe('createCustomerDraft', () => {
    it('should create a valid customer draft object', () => {
      const formItems = {
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfBirth: '1985-05-05',
        street: '123 First Ave',
        city: 'Hamburg',
        postalCode: '20095',
        countryName: 'Georgia',
        email: 'jane@example.com',
        password: 'securepass',
        useSameAddress: false,
        shippingStreet: '456 Second Ave',
        shippingCity: 'Berlin',
        shippingPostalCode: '10117',
        shippingCountry: 'Germany',
        defaultBilling: true,
        defaultShipping: true,
      };

      const draft = createCustomerDraft(formItems);
      expect(draft).toMatchObject({
        email: 'jane@example.com',
        password: 'securepass',
        firstName: 'Jane',
        lastName: 'Smith',
        dateOfBirth: '1985-05-05',
        isEmailVerified: true,
        defaultBillingAddress: 0,
        defaultShippingAddress: 1,
        addresses: [
          {
            streetName: '123 First Ave',
            city: 'Hamburg',
            postalCode: '20095',
            country: 'GE',
          },
          {
            streetName: '456 Second Ave',
            city: 'Berlin',
            postalCode: '10117',
            country: 'GE',
          },
        ],
      });
    });
  });

  describe('normalizeCountryInput', () => {
    it('should return country code if name matches', () => {
      const code = normalizeCountryInput('germany');
      const expected = countries.find((c) => c.name.toLowerCase() === 'germany')?.code || 'GE';
      expect(code).toBe(expected);
    });

    it('should fallback to GE if no match', () => {
      expect(normalizeCountryInput('UnknownCountry')).toBe('GE');
    });
  });

  describe('denormalizeCountryCode', () => {
    it('should return country name from code', () => {
      const name = denormalizeCountryCode('DE');
      const expected = countries.find((c) => c.code === 'DE')?.name || 'Unknown Country';
      expect(name).toBe(expected);
    });

    it('should return Unknown Country if no match', () => {
      expect(denormalizeCountryCode('XX')).toBe('Unknown Country');
    });
  });

  describe('sessionStorage interaction', () => {
    beforeEach(() => {
      sessionStorage.clear();
    });

    it('should save and get session user info', () => {
      const mockCustomer = { id: 'cust123', version: 5 } as any;
      saveLoggedInUserToSessionStorage(mockCustomer, true);

      const sessionUser = getLoggedInUserFromSessionStorage();
      expect(sessionUser).toEqual({
        customerId: 'cust123',
        customerVersion: '5',
      });

      expect(getIsAuthorizedFromSessionStorage()).toBe(true);
    });

    it('should return null if session storage is missing values', () => {
      expect(getLoggedInUserFromSessionStorage()).toBeNull();
    });

    it('should remove user from session storage on logout', () => {
      sessionStorage.setItem(customerId, 'someId');
      sessionStorage.setItem(customerVersion, '1');
      sessionStorage.setItem(isAuthorizedKey, 'true');

      logoutUser();

      expect(sessionStorage.getItem(customerId)).toBeNull();
      expect(sessionStorage.getItem(customerVersion)).toBeNull();
      expect(sessionStorage.getItem(isAuthorizedKey)).toBeNull();
    });
  });
});
