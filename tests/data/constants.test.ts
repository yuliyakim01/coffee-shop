import {
  FormElements,
  AuthRedirect,
  allowedCountries,
  AppMessages,
  StatusType,
  UpdateTypes,
  CustomerFields,
  ButtonText,
  sameAddressCheckboxMessage,
} from '@/data/constants';

describe('Constants and Objects', () => {
  test('FormElements should have expected structure', () => {
    expect(FormElements.email).toEqual({
      label: 'Email',
      placeholder: 'Enter your email',
      type: 'email',
    });
    expect(FormElements.country.defaultValue).toBe('Select a country');
    expect(FormElements.street.labelFilled).toBe('Street Name');
    expect(FormElements.shippingCity.placeholder).toBe('Shipping city');
  });

  test('AuthRedirect should contain expected labels', () => {
    expect(AuthRedirect.registerPage.label).toBe('Login');
    expect(AuthRedirect.loginPage.label).toBe('Sign Up');
  });

  test('Allowed countries list should include Kyrgyzstan', () => {
    expect(allowedCountries).toContain('Kyrgyzstan');
  });

  test('AppMessages should have correct success messages', () => {
    expect(AppMessages.profileUpdateSuccess).toBe('Profile updated successfully!');
    expect(AppMessages.addressCreationSuccess).toBe('New address created successfully!');
  });

  test('StatusType should contain expected keys', () => {
    expect(StatusType.success).toBe('success');
    expect(StatusType.error).toBe('error');
  });

  test('UpdateTypes should have expected update actions', () => {
    expect(UpdateTypes.setDefaultBillingAddress).toBe('setDefaultBillingAddress');
    expect(UpdateTypes.removeAddress).toBe('removeAddress');
  });

  test('CustomerFields should correctly map field names', () => {
    expect(CustomerFields.email).toBe('email');
    expect(CustomerFields.firstName).toBe('firstName');
  });

  test('ButtonText should have proper button labels', () => {
    expect(ButtonText.save).toBe('Save');
    expect(ButtonText.changePassword).toBe('Change Password');
  });

  test('sameAddressCheckboxMessage should have expected text', () => {
    expect(sameAddressCheckboxMessage).toBe('Check this if you want to use your billing address for shipping as well.');
  });
});
