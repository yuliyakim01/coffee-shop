export interface Country {
  code: string;
  name: string;
}

export const countries: Country[] = [
  {
    code: 'GE',
    name: 'Georgia',
  },
];
export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const currencies: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
];
export interface Language {
  code: string;
  name: string;
  locale: string;
}

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English (United States)',
    locale: 'en-US',
  },
];
export type ProductType = 'Coffee' | 'Tea' | 'Smoothies';

export const productTypes: ProductType[] = ['Coffee', 'Tea', 'Smoothies'];

export interface Address {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string; // ISO 3166-1 alpha-2 code (e.g., 'GE')
  useAsDefault?: boolean; // Optional: true = use for shipping/billing
}
export interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // Format: YYYY-MM-DD
  address?: Address;
}
export interface ApiError {
  statusCode?: number;
  message?: string;
  errors?: { code: string; message: string }[];
}
export interface PopupProps {
  message: string;
  onClose?: () => void;
  autoDismissMs?: number;
}
