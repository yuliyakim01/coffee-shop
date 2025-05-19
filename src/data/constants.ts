export const customerId = 'customerId';
export const customerVersion = 'customerVersion';

export interface SessionUser {
  customerId: string;
  customerVersion: string;
}

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
  },
  city: {
    label: '',
    placeholder: 'City',
  },
  postalCode: {
    label: '',
    placeholder: 'Postal Code',
  },
  country: {
    label: '',
    placeholder: 'Country',
  },
  defaultAddress: {
    label: 'Use as default address',
  },
};
export const defaultAddressCheckboxMessage =
  'Use as default for shipping and billing address. You can change it later in your profile.';
export const AuthRedicrect = {
  registerPage: {
    question: 'Already Have An Account?',
    label: 'Login',
  },
  loginPage: {
    question: "Don't have an account?",
    label: 'Sign Up',
  },
};

export interface RegistrationFormItems {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  countryName: string;
  email: string;
  password: string;
  useAsDefaultAddress: boolean;
}
