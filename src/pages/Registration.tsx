import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import '../styles/index.css';
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

import eyeOnIcon from '../assets/eye.png';
import eyeOffIcon from '../assets/eye-off.png';
import BackButton from '@/components/BackButton';

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
    <div className="register-container">
      <div className="back-button">
        <BackButton />
      </div>
      <h1 className="main-h1">Create an account</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="full-name-container">
          <div className="form-group">
            <label>First name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Jane"
              value={firstName}
              onChange={(e) => {
                const value = e.target.value;
                setFirstName(value);
                setFirstNameError(validateName(value) || '');
              }}
              required
            />
            {firstNameError && <p style={{ color: 'red', fontSize: '14px' }}>{firstNameError}</p>}
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              className="form-input"
              type="text"
              placeholder="e.g. Doe"
              value={lastName}
              onChange={(e) => {
                const value = e.target.value;
                setLastName(value);
                setLastNameError(validateName(value) || '');
              }}
              required
            />
            {lastNameError && <p style={{ color: 'red', fontSize: '14px' }}>{lastNameError}</p>}
          </div>
        </div>

        <div className="form-group">
          <label>Date of Birth</label>
          <input
            className="form-input"
            type="date"
            value={dob}
            onChange={(e) => {
              const value = e.target.value;
              setDob(value);
              setDobError(validateDOB(value) || '');
            }}
            required
          />
          {dobError && <p style={{ color: 'red', fontSize: '14px' }}>{dobError}</p>}
        </div>

        <div className="form-group">
          <label>Address</label>

          {/* First Row: Street and City */}
          <div className="flex gap-4 mt-2">
            {/* Street */}
            <div className="flex flex-col w-1/2">
              <input
                className="form-input"
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => {
                  const value = e.target.value;
                  setStreet(value);
                  setStreetError(validateStreet(value) || '');
                }}
                required
              />
              {streetError && <p style={{ color: 'red', fontSize: '14px' }}>{streetError}</p>}
            </div>

            {/* City */}
            <div className="flex flex-col w-1/2">
              <input
                className="form-input"
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => {
                  const value = e.target.value;
                  setCity(value);
                  setCityError(validateCity(value) || '');
                }}
                required
              />
              {cityError && <p style={{ color: 'red', fontSize: '14px' }}>{cityError}</p>}
            </div>
          </div>

          {/* Second Row: Postal Code and Country */}
          <div className="flex gap-4 mt-4">
            {/* Postal Code */}
            <div className="flex flex-col w-1/2">
              <input
                className="form-input"
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => {
                  const value = e.target.value;
                  setPostalCode(value);
                  setPostalCodeError(validatePostalCode(value, country) || '');
                }}
                required
              />
              {postalCodeError && <p style={{ color: 'red', fontSize: '14px' }}>{postalCodeError}</p>}
            </div>

            {/* Country */}
            <div className="flex flex-col w-1/2">
              <select
                className="form-input"
                value={country}
                onChange={(e) => {
                  const selectedCountry = e.target.value;
                  setCountry(selectedCountry);
                  setCountryError(validateCountry(selectedCountry) || '');
                }}
                required
              >
                <option value="">Select a country</option>
                {allowedCountries.map((countryName) => (
                  <option key={countryName} value={countryName}>
                    {countryName}
                  </option>
                ))}
              </select>
              {countryError && <p style={{ color: 'red', fontSize: '14px' }}>{countryError}</p>}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              const value = e.target.value.trim();
              setEmail(value);
              setEmailError(validateEmail(value) || '');
            }}
            required
          />
          {emailError && <p style={{ color: 'red', fontSize: '14px' }}>{emailError}</p>}
        </div>

        <div className="form-group" style={{ position: 'relative' }}>
          <label>Password</label>
          <input
            className="form-input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              const value = e.target.value.trim();
              setPassword(value);
              setPasswordError(validatePassword(value) || '');
            }}
            required
            style={{ paddingRight: '40px' }}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '30px',
              height: '30px',
              background: 'transparent',
              border: 'none',
              padding: '0',
              cursor: 'pointer',
              opacity: 0.7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img
              src={showPassword ? eyeOffIcon : eyeOnIcon}
              alt={showPassword ? 'Hide password' : 'Show password'}
              style={{
                width: '20px',
                height: '20px',
                objectFit: 'contain',
              }}
            />
          </button>

          {passwordError && <p style={{ color: 'red', fontSize: '14px' }}>{passwordError}</p>}

          <div className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </div>
        </div>

        <button type="submit" className="login-button">
          Create account
        </button>

        <p className="signup-link">
          Already Have An Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
