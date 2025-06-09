import React, { useState, useRef } from 'react';
import Input from '@/components/Login-registration-components/Input';
import CountryInput from '@/components/Login-registration-components/CountryInput';
import { showToast } from '@/utils/profileUtils';
import { validateStreet, validateCity, validatePostalCode, validateCountry } from '@/utils/validation';
import { normalizeCountryInput } from '@/utils/customerUtils';
import type { AddressRefs } from '@/data/interfaces';
import Button from '@/components/Login-registration-components/Button';
import type { Address } from '@commercetools/platform-sdk';
import { AppMessages, ButtonText, CustomerFields, FormElements, StatusType } from '@/data/constants';

export const AddAddress: React.FC<{
  onAdd: (newAddress: Address) => void;
  handleSetDefaultAddress: (field: string, addressId: string) => void;
}> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState(false);
  const [isDefaultShipping, setIsDefaultShipping] = useState(false);
  const addressRefs = useRef<{ [key: string]: AddressRefs }>({});

  const handleSave = () => {
    const street = addressRefs.current[CustomerFields.streetName]?.getValue() || '';
    const city = addressRefs.current[CustomerFields.city]?.getValue() || '';
    const postalCode = addressRefs.current[CustomerFields.city]?.getValue() || '';
    const country = addressRefs.current[CustomerFields.country]?.getValue() || '';

    const errors = [
      addressRefs.current[CustomerFields.streetName]?.getError(),
      addressRefs.current[CustomerFields.city]?.getError(),
      addressRefs.current[CustomerFields.city]?.getError(),
      addressRefs.current[CustomerFields.country]?.getError(),
    ];

    if (errors.some((error) => error)) {
      showToast(AppMessages.validationFixRequest, StatusType.error);
      return;
    }
    const newAddress = {
      streetName: street,
      city,
      postalCode,
      country: normalizeCountryInput(country),
      isDefaultBilling,
      isDefaultShipping,
    };
    onAdd(newAddress);
    setIsOpen(false);
  };
  const validatePostalCodeWrapper = (postalCode: string, country?: string) => {
    if (!country) {
      console.error(AppMessages.validationCountryUndefined);
      return AppMessages.validationCountryIsRequired;
    }

    return validatePostalCode(postalCode, country.trim());
  };

  return (
    <div>
      <Button
        label={ButtonText.addNewAddress}
        className="bg-rose-300 text-slate-600 transition-transform duration-200 hover:scale-105"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9998]">
          <div className="bg-coffeeBrown p-6 rounded-lg w-96 flex flex-col gap-2 fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999]">
            <h2 className="text-xl font-semibold mb-4">{ButtonText.addNewAddress}</h2>

            <Input
              ref={(el) => (addressRefs.current[CustomerFields.streetName] = el!)}
              label={FormElements.street.labelFilled}
              validate={validateStreet}
            />
            <Input
              ref={(el) => (addressRefs.current[CustomerFields.city] = el!)}
              label={FormElements.city.labelFilled}
              validate={validateCity}
            />
            <Input
              ref={(el) => (addressRefs.current[CustomerFields.city] = el!)}
              label={FormElements.postalCode.labelFilled}
              validate={(val) =>
                validatePostalCodeWrapper(val, addressRefs.current[CustomerFields.country]?.getValue() || '')
              }
            />
            <CountryInput
              ref={(el) => (addressRefs.current[CustomerFields.country] = el!)}
              label={FormElements.country.labelFilled}
              placeholder={FormElements.country.defaultValue}
              onChange={(selectedCountry) => {
                addressRefs.current[CustomerFields.country]?.setValueExternally(selectedCountry);

                const currentPostal = addressRefs.current[CustomerFields.city]?.getValue() ?? '';

                const error = validatePostalCode(currentPostal, selectedCountry);
                addressRefs.current[CustomerFields.city]?.setErrorExternally(error);
              }}
              validate={validateCountry}
            />

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-300">
                {' '}
                <input
                  type="checkbox"
                  checked={isDefaultBilling}
                  onChange={() => setIsDefaultBilling(!isDefaultBilling)}
                />
                <span className="text-sm ">Set as Default Billing Address</span>
              </div>
              <div className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-300">
                {' '}
                <input
                  type="checkbox"
                  checked={isDefaultShipping}
                  onChange={() => setIsDefaultShipping(!isDefaultShipping)}
                />
                <span className="text-sm ">Set as Default Shipping Address</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  showToast(AppMessages.addressCreationCancel, StatusType.success);
                  setIsOpen(false);
                }}
                className="bg-[#6f4e37] text-gray-50 p-2 rounded w-full transition-transform duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#6f4e37] text-white p-2 rounded w-full transition-transform duration-200 hover:scale-105"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddress;
