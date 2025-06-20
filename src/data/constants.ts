export const customerId = 'customerId';
export const customerVersion = 'customerVersion';

export const FormElements = {
  email: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
  password: {},
  firstName: {
    label: 'First Name',
    placeholder: 'e.g. Jane',
  },
  lastName: {
    label: 'Last Name',
    placeholder: 'e.g. Doe',
  },
  dob: {
    label: 'Date of Birth',
    type: 'date',
  },
  street: {
    label: '',
    placeholder: 'Street',
    labelFilled: 'Street Name',
  },
  city: {
    label: '',
    placeholder: 'City',
    labelFilled: 'City',
  },
  postalCode: {
    label: '',
    placeholder: 'Postal Code',
    labelFilled: 'Postal Code',
  },
  country: {
    label: '',
    placeholder: 'Country',
    labelFilled: 'Country',
    defaultValue: 'Select a country',
  },
  sameAddress: {
    label: 'Use same address for shipping',
  },
  shippingCountry: {
    placeholder: 'Shipping Country',
  },
  shippingPostalCode: {
    placeholder: 'Shipping postal code',
  },
  shippingCity: {
    placeholder: 'Shipping city',
  },
  shippingStreet: {
    placeholder: 'Shipping street',
  },
  shippingAddress: 'Shipping Address',
  billingAddress: 'Billing Address',
  setAsDefaultBillingAddress: 'Set as Default Billing Address',
  setAsDefaultShippingAddress: 'Set as Default Shipping Address',
  defaultBillingAddress: 'Default Billing Address',
  defaultShippingAddress: 'Default Shipping Address',
};

export const sameAddressCheckboxMessage = 'Check this if you want to use your billing address for shipping as well.';

export const AuthRedirect = {
  registerPage: {
    question: 'Already Have An Account?',
    label: 'Login',
  },
  loginPage: {
    question: "Don't have an account?",
    label: 'Sign Up',
  },
};
export const allowedCountries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Georgia',
  'Uzbekistan',
  'Kyrgyzstan',
];
export const AppMessages = {
  profileUpdateSuccess: 'Profile updated successfully!',
  profileUpdateCancel: 'Profile changes are cancelled',
  profileUpdateFailure: 'Failed to update profile. Please try again.',
  profileUpdateError: 'Error updating customer:',
  addressUpdateSuccess: 'Address updated successfully!',
  addressUpdateError: 'Error updating address:',
  addressUpdateFailure: 'Failed to update address. Please try again.',
  addressCreationSuccess: 'New address created successfully!',
  addressCreationFailure: 'Failed to create address. Please try again.',
  addressCreationError: 'Error adding new address:',
  addressCreationCancel: 'Address entry canceled',
  addressDeleteSuccess: 'Address deleted successfully!',
  addressDeleteFailure: 'Failed to delete address. Please try again.',
  addressDeleteFailureID: 'Failed to remove address. No ID found.',
  addressDeleteError: 'Error removing address:',
  addressFetchFailure: 'Failed to retrieve new address. Please try again.',
  custemerFetchFailure: 'Failed to fetch customer!',
  noChangesDetected: 'No changes detected.',
  validationFailed: 'Validation failed',
  validationFixRequest: 'Please fix validation errors before submitting.',
  validationCountryUndefined: 'Country is undefined in postal code validation!',
  validationCountryIsRequired: 'Country is required for postal code validation.',
  emptyValidation: '',
  youAreInEditMode: 'You are in edit mode... Use buttons below to save your changes or exist edit mode.',
  customerDoesNotExist: 'Customer does not exist',
  passwordChangeSuccess: 'Password successfully changed!',
  passwordsDoNotMatch: 'Passwords do not match',
  notLoggedIn: 'Not logged in',
  addToCartSuccess: 'Product added to cart!',
};
export const StatusType: { success: 'success'; error: 'error' } = {
  success: 'success',
  error: 'error',
};
export const UpdateTypes = {
  setDefaultBillingAddress: 'setDefaultBillingAddress',
  setDefaultShippingAddress: 'setDefaultShippingAddress',
  removeAddress: 'removeAddress',
  changeAddress: 'changeAddress',
  addAddress: 'addAddress',
};
export const CustomerFields = {
  streetName: 'streetName',
  city: 'city',
  postalCode: 'postalCode',
  country: 'country',
  defaultShippingAddressId: 'defaultShippingAddressId',
  defaultBillingAddressId: 'defaultBillingAddressId',
  dateOfBirth: 'dateOfBirth',
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
};
export const ButtonText = {
  save: 'Save',
  saving: 'Saving...',
  saveChanges: 'Save Changes',
  addNewAddress: 'Add New Address',
  changePassword: 'Change Password',
};
export const CartFields = {
  addToCart: 'Add to Cart',
  removeFromCart: 'Remove from Cart',
  usd: 'USD',
  anonymousId: 'anonymousId',
};
export const CartUpdateActions = {
  // Line item actions
  addLineItem: 'addLineItem',
  changeLineItemQuantity: 'changeLineItemQuantity',
  removeLineItem: 'removeLineItem',
  setLineItemCustomField: 'setLineItemCustomField',
  setLineItemCustomType: 'setLineItemCustomType',
  setLineItemDistributionChannel: 'setLineItemDistributionChannel',
  setLineItemPrice: 'setLineItemPrice',
  setLineItemShippingDetails: 'setLineItemShippingDetails',

  // Discount and price actions
  addDiscountCode: 'addDiscountCode',
  removeDiscountCode: 'removeDiscountCode',
  recalculate: 'recalculate',
  setCustomLineItemTaxAmount: 'setCustomLineItemTaxAmount',
  setLineItemTaxAmount: 'setLineItemTaxAmount',

  // Shipping address and methods
  addItemShippingAddress: 'addItemShippingAddress',
  removeItemShippingAddress: 'removeItemShippingAddress',
  updateItemShippingAddress: 'updateItemShippingAddress',
  setShippingAddress: 'setShippingAddress',
  setShippingMethod: 'setShippingMethod',
  setCustomShippingMethod: 'setCustomShippingMethod',

  // Custom fields
  setCustomField: 'setCustomField',
  setCustomType: 'setCustomType',

  // Customer and billing info
  setBillingAddress: 'setBillingAddress',
  setCustomerEmail: 'setCustomerEmail',
  setCustomerGroup: 'setCustomerGroup',
  setCustomerId: 'setCustomerId',

  // Locale and currency
  setCountry: 'setCountry',
  setLocale: 'setLocale',
  setCurrency: 'setCurrency',

  // Others
  setAnonymousId: 'setAnonymousId',
  setDeleteDaysAfterLastModification: 'setDeleteDaysAfterLastModification',
} as const;

export enum PriceRange {
  UNDER_5 = 'under-5',
  BETWEEN_5_AND_15 = '5-15',
  OVER_15 = 'over-15',
}

export const PRICE_RANGE_VALUES: Record<PriceRange, { min?: number; max?: number }> = {
  [PriceRange.UNDER_5]: { max: 5 },
  [PriceRange.BETWEEN_5_AND_15]: { min: 5, max: 15 },
  [PriceRange.OVER_15]: { min: 15.01 },
};
