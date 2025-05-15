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
import BackButton from '@/components/Login-registration-components/BackButton';
import Input from '@/components/Login-registration-components/Input';
import TogglePasswordVisibleButton from '@/components/Login-registration-components/TogglePasswordVisibleButton';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [streetError, setStreetError] = useState('');
  const [cityError, setCityError] = useState('');
  const [postalCodeError, setPostalCodeError] = useState('');
  const [countryError, setCountryError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    });
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

          <div className="flex flex-col w-full relative">
            <label className="font-semibold text-base mb-1">Password</label>
            <input
              className="w-full h-12 px-3 pr-12 border border-gray-300 rounded-lg bg-white font-poppins text-base"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              required
            />
            <TogglePasswordVisibleButton showPassword={showPassword} onToggle={() => setShowPassword(!showPassword)} />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}

            <div className="flex justify-end w-full mt-1">
              <Link to="/forgot-password" className="text-blue-500 text-sm underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-[52px] flex justify-center items-center bg-[#6f4e37] text-white font-semibold text-lg rounded-lg mt-5"
          >
            Create account
          </button>

          <p className="w-full text-center text-sm mt-5">
            Already Have An Account?
            <Link to="/login" className="text-blue-500 font-medium underline ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
