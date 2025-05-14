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
