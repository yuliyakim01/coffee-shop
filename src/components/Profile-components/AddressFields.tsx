import type { RefObject } from 'react';
import React, { useCallback, useEffect } from 'react';
import Input from '@/components/Login-registration-components/Input';
import CountryInput from '@/components/Login-registration-components/CountryInput';
import { validatePostalCode, validateCountry, validateStreet, validateCity } from '@/utils/validation';
import type { Address } from '@commercetools/platform-sdk';
import { denormalizeCountryCode } from '@/utils/customerUtils';
import type { InputHandle } from '@/data/interfaces';
import { AppMessages, CustomerFields, FormElements } from '@/data/constants';

interface AddressFieldsProps {
  address?: Address;
  setAddress: (updatedAddress: Address) => void;
  addressRefs: RefObject<Record<number, Record<string, InputHandle>>>;
  addressValidityRefs: RefObject<Record<number, Record<string, boolean>>>;
  index: number;
  isBillingDefault: boolean;
  setIsBillingDefault: (value: boolean) => void;
  isShippingDefault: boolean;
  setIsShippingDefault: (value: boolean) => void;
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  address = {
    streetName: AppMessages.emptyValidation,
    city: AppMessages.emptyValidation,
    postalCode: AppMessages.emptyValidation,
    country: AppMessages.emptyValidation,
  },
  setAddress,
  addressRefs,
  addressValidityRefs,
  index,
  isBillingDefault,
  setIsBillingDefault,
  isShippingDefault,
  setIsShippingDefault,
}) => {
  const allowedFields = [
    CustomerFields.streetName,
    CustomerFields.city,
    CustomerFields.postalCode,
    CustomerFields.country,
  ];

  const ensureValidityRefExists = useCallback(() => {
    if (!addressValidityRefs.current[index]) {
      addressValidityRefs.current[index] = {
        streetName: false,
        city: false,
        postalCode: false,
        country: false,
      };
    }
  }, [addressValidityRefs, index]);

  useEffect(() => {
    ensureValidityRefExists();
  }, [ensureValidityRefExists]);

  return (
    <div className="flex flex-col gap-4">
      {allowedFields.map((field) =>
        field === CustomerFields.country ? (
          <CountryInput
            key={field}
            ref={(el) => {
              if (!addressRefs.current[index]) addressRefs.current[index] = {};
              addressRefs.current[index][field] = el;
            }}
            label={FormElements.country.labelFilled}
            initialValue={denormalizeCountryCode(address.country)}
            onChange={(selectedCountry) => {
              const updatedAddress = { ...address, country: selectedCountry };
              setAddress(updatedAddress);

              const countryError = validateCountry(selectedCountry);
              addressValidityRefs.current[index].country = countryError === AppMessages.emptyValidation;
              addressRefs.current[index]?.country?.setErrorExternally?.(countryError);

              const postalCodeVal = addressRefs.current[index]?.postalCode?.getValue() || AppMessages.emptyValidation;
              const postalCodeError = validatePostalCode(postalCodeVal, selectedCountry);
              addressRefs.current[index]?.postalCode?.setErrorExternally(postalCodeError);
              addressValidityRefs.current[index].postalCode = postalCodeError === AppMessages.emptyValidation;
            }}
            validate={validateCountry}
          />
        ) : (
          <Input
            key={field}
            ref={(el) => {
              if (!addressRefs.current[index]) addressRefs.current[index] = {};
              addressRefs.current[index][field] = el;
            }}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            initialValue={address[field as keyof Address] ?? AppMessages.emptyValidation}
            onChange={(val) => {
              const updatedAddress = { ...address, [field]: val };
              setAddress(updatedAddress);

              let error = AppMessages.emptyValidation;
              if (field === CustomerFields.streetName) {
                error = validateStreet(val);
              } else if (field === CustomerFields.city) {
                error = validateCity(val);
              } else if (field === CustomerFields.postalCode) {
                error = validatePostalCode(val, address.country);
              }

              addressRefs.current[index]?.[field]?.setErrorExternally(error);
              addressValidityRefs.current[index][field] = error === AppMessages.emptyValidation;
            }}
            validate={
              field === CustomerFields.streetName
                ? validateStreet
                : field === CustomerFields.city
                  ? validateCity
                  : field === CustomerFields.postalCode
                    ? (val) => validatePostalCode(val, address.country)
                    : undefined
            }
          />
        )
      )}

      <div className="flex flex-col gap-2 mt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isBillingDefault} onChange={(e) => setIsBillingDefault(e.target.checked)} />
          <span className="text-sm text-gray-600">{FormElements.setAsDefaultBillingAddress}</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isShippingDefault} onChange={(e) => setIsShippingDefault(e.target.checked)} />
          <span className="text-sm text-gray-600">{FormElements.setAsDefaultShippingAddress}</span>
        </label>
      </div>
    </div>
  );
};

export default AddressFields;
