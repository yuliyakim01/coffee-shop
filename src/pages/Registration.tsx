import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  validateEmail,
  validatePassword,
  validateName,
  validateDOB,
  validateStreet,
  validateCity,
  validatePostalCode,
  validateCountry,
} from '@/utils/validation';
import ErrorPopup from '@/components/Popup-components/ErrorPopup';
import SuccessPopup from '@/components/Popup-components/SuccessPopup';

import eyeOnIcon from '../assets/eye.png';
import eyeOffIcon from '../assets/eye-off.png';
import DefaultAddressCheckbox from '@/components/Profile-components/DefaultAddressCheckbox';
import { useRegistration } from '@/utils/useRegistration';
import { createCustomerDraft } from '@/utils/customerUtils';
import { CustomerDraft } from '@commercetools/platform-sdk';
import handleApiError from '@/utils/handleApiError';
import NotificationBanners from '@/components/Popup-components/NotificationBanners';
import BackButton from '@/components/Login-registration-components/BackButton';
import Input from '@/components/Login-registration-components/Input';
import PasswordInput from '@/components/Login-registration-components/PasswordInput';
import Button from '@/components/Login-registration-components/Button';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const allowedCountries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Georgia',
    'Uzbekistan',
    'Kyrgyzstan',
  ];

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [countryError, setCountryError] = useState('');
  const [useAsDefaultAddress, setUseAsDefaultAddress] = useState(true);

  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const { register } = useRegistration();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiErrorMessage(null);
    setShowSuccess(null);

    const firstNameValidationError = validateName(firstName);
    const lastNameValidationError = validateName(lastName);
    const dobValidationError = validateDOB(dob);
    const streetValidationError = validateStreet(street);
    const cityValidationError = validateCity(city);
    const postalCodeValidationError = validatePostalCode(postalCode, country);
    const countryValidationError = validateCountry(country);
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);

    setFirstNameError(firstNameValidationError || '');
    setLastNameError(lastNameValidationError || '');
    setDobError(dobValidationError || '');
    setStreetError(streetValidationError || '');
    setCityError(cityValidationError || '');
    setPostalCodeError(postalCodeValidationError || '');
    setCountryError(countryValidationError || '');
    setEmailError(emailValidationError || '');
    setPasswordError(passwordValidationError || '');

    if (
      firstNameValidationError ||
      lastNameValidationError ||
      dobValidationError ||
      streetValidationError ||
      cityValidationError ||
      postalCodeValidationError ||
      countryValidationError ||
      emailValidationError ||
      passwordValidationError
    ) {
      return;
    }

    console.log('Creating account with:', {
      firstName,
      lastName,
      dob,
      street,
      city,
      postalCode,
      country,
      email,
      password,
      useAsDefaultAddress,
    });

    const draft: CustomerDraft = createCustomerDraft(
      firstName,
      lastName,
      dob,
      street,
      city,
      postalCode,
      country,
      email,
      password,
      useAsDefaultAddress
    );

    try {
      setLoading(true);
      await register(draft);
      setShowSuccess('Registration successful');
    } catch (error: unknown) {
      setApiErrorMessage(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0e6d7]">
      <div className="flex flex-col items-center w-[40rem] p-12 bg-[#e6d7c2] rounded-2xl shadow-xl mt-10">
        <div className="fixed top-8 left-8 z-50">
          <BackButton />
        </div>
        <h1 className="font-semibold text-4xl mb-8">Create an account</h1>

        <form className="flex flex-col items-start gap-5 w-full" onSubmit={handleSubmit}>
          <div className="flex gap-4 w-full">
            <Input
              label="First Name"
              placeholder="e.g. Jane"
              value={firstName}
              setValue={setFirstName}
              validate={validateName}
              setError={setFirstNameError}
              error={firstNameError}
            />
            <Input
              label="Last Name"
              placeholder="e.g. Doe"
              value={lastName}
              setValue={setLastName}
              validate={validateName}
              setError={setLastNameError}
              error={lastNameError}
            />
          </div>

          <Input
            label="Date of Birth"
            type="date"
            value={dob}
            setValue={setDob}
            validate={validateDOB}
            setError={setDobError}
            error={dobError}
          />

          <div className="flex flex-col w-full">
            <label className="font-semibold text-base mb-1">Address</label>

            <div className="flex gap-4 mt-2">
              <Input
                label=""
                placeholder="Street"
                value={street}
                setValue={setStreet}
                validate={validateStreet}
                setError={setStreetError}
                error={streetError}
              />
              <Input
                label=""
                placeholder="City"
                value={city}
                setValue={setCity}
                validate={validateCity}
                setError={setCityError}
                error={cityError}
              />
            </div>

            <div className="flex gap-4 mt-4">
              <Input
                label=""
                placeholder="Postal Code"
                value={postalCode}
                setValue={setPostalCode}
                validate={(val) => validatePostalCode(val, country)}
                setError={setPostalCodeError}
                error={postalCodeError}
              />
              <Input
                label=""
                placeholder="Country"
                value={country}
                setValue={setCountry}
                validate={validateCountry}
                setError={setCountryError}
                error={countryError}
              />
            </div>
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            setValue={setEmail}
            validate={validateEmail}
            setError={setEmailError}
            error={emailError}
          />

          <PasswordInput
            password={password}
            setPassword={setPassword}
            passwordError={passwordError}
            setPasswordError={setPasswordError}
            showForgotPassword={false}
          />

          <Button type="submit" label="Create account" className="mt-5" />

          <p className="w-full text-center text-sm mt-5">
            Already Have An Account?
            <Link to="/login" className="text-blue-500 font-medium underline ml-1">
              Login
            </Link>
          </p>
        </form>

      <NotificationBanners
        errorMessage={apiErrorMessage}
        onClearError={() => setApiErrorMessage(null)}
        successMessage={showSuccess}
        onClearSuccess={() => setShowSuccess(null)}
        autoDismissMs={5000}
      />
    </div>
  );
};

export default Register;
