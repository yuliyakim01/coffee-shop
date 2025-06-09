import React, { useState, useEffect, useRef } from 'react';
import type {
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import {
  denormalizeCountryCode,
  getLoggedInUserFromSessionStorage,
  normalizeCountryInput,
} from '@/utils/customerUtils';
import { getCustomerById } from '@/api/customers';
import Button from '@/components/Login-registration-components/Button';
import {
  validateCity,
  validateCountry,
  validateDOB,
  validateEmail,
  validateName,
  validatePostalCode,
  validateStreet,
} from '@/utils/validation';
import type { addAddressType, HandleSaveEditOptions, InputHandle } from '@/data/interfaces';
import { updateCustomer } from '@/api/profile/update';
import type { Address, CustomerUpdate } from '@commercetools/platform-sdk';
import 'toastify-js/src/toastify.css';
import { generateAddressActions, generatePersonalInfoActions, showToast, validateCustomer } from '@/utils/profileUtils';
import '@/styles/profile.css';
import ProfileHeader from '@/components/Profile-components/ProfileHeader';
import PersonalInfoSection from '@/components/Profile-components/PersonalInfoSection';
import AddressSection from '@/components/Profile-components/AddressSection';
import { PasswordChangeButton } from '@/components/Profile-components/PasswordChangeButton';
import AddAddress from '@/components/Profile-components/AddAddress';
import { AppMessages, ButtonText, CustomerFields, StatusType, UpdateTypes } from '@/data/constants';

const ProfileComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const customerInputRefs = useRef<{ [key: string]: InputHandle }>({});
  const addressRefs = useRef<{ [key: number]: { [key: string]: InputHandle } }>({});
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);

  const validationFunctions = {
    firstName: validateName,
    lastName: validateName,
    dateOfBirth: validateDOB,
    email: validateEmail,
    streetName: validateStreet,
    city: validateCity,
    postalCode: (val: string, index?: number) =>
      validatePostalCode(val, addressRefs.current[index!]?.country?.getValue() ?? ''),
    country: validateCountry,
  };
  const [originalCustomer, setOriginalCustomer] = useState<Customer | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (addressToDelete !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [addressToDelete]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const user = getLoggedInUserFromSessionStorage();
        if (!user || !user.customerId) return;

        const customerData = await getCustomerById(user.customerId);
        if (!customerData) return;

        setCustomer(customerData);
      } catch (error) {
        console.error(AppMessages.custemerFetchFailure, error);
        throw error;
      }
    };
    fetchCustomer();
  }, []);

  if (!customer) {
    return <div>Loading customer data...</div>;
  }
  const updateCustomerState = (customerValue: Customer) => {
    setCustomer(null);
    setTimeout(() => {
      setCustomer(customerValue);
    }, 0);
  };
  const generateUpdatedCustomerPayload = (customer: Customer): CustomerUpdate | null => {
    const actions: CustomerUpdateAction[] = [
      ...generatePersonalInfoActions(customerInputRefs),
      ...generateAddressActions(customer),
    ];
    if (customer.defaultBillingAddressId !== customerInputRefs.current['defaultBilling']?.initialValue) {
      actions.push({
        action: UpdateTypes.setDefaultBillingAddress,
        addressId: customer.defaultBillingAddressId,
      });
    }

    if (customer.defaultShippingAddressId !== customerInputRefs.current['defaultShipping']?.initialValue) {
      actions.push({
        action: UpdateTypes.setDefaultShippingAddress,
        addressId: customer.defaultShippingAddressId,
      });
    }

    return actions.length > 0 ? { version: customer.version, actions } : { version: customer.version, actions: [] };
  };

  const updateCustomerProfile = async (payload: CustomerUpdate) => {
    try {
      const response = await updateCustomer(customer, payload);

      showToast(AppMessages.profileUpdateSuccess, StatusType.success);
      updateCustomerState(response);
      setSuccessMessage(AppMessages.profileUpdateSuccess);
      setIsEditing(false);
    } catch (error) {
      console.error(AppMessages.profileUpdateError, error);
      showToast(AppMessages.profileUpdateFailure, StatusType.error);
      setErrorMessage(AppMessages.profileUpdateFailure);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const errors = validateCustomer(customer);
    if (Object.keys(errors).length > 0) {
      console.warn(AppMessages.validationFailed, errors);
      showToast(AppMessages.validationFixRequest, StatusType.error);
      setErrorMessage(AppMessages.validationFixRequest);
      setLoading(false);
      return;
    }
    const payload = generateUpdatedCustomerPayload(customer);

    if (!payload) {
      setSuccessMessage(AppMessages.noChangesDetected);
      setLoading(false);
      return;
    }
    updateCustomerProfile(payload);
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomer((prev) => (prev ? { ...prev, [field]: value } : prev));
  };
  const handleSetDefaultAddress = (field: string, addressId: string) => {
    setCustomer((prev) =>
      prev
        ? {
            ...prev,
            [field]: addressId,
          }
        : prev
    );
  };
  const resetInputFields = () => {
    Object.keys(customerInputRefs.current).forEach((field) => {
      const value = originalCustomer?.[field as keyof Customer];
      customerInputRefs.current[field]?.setValueExternally(typeof value === 'string' ? value : String(value ?? ''));
    });

    customer.addresses.forEach((address, index) => {
      const addressRef = addressRefs.current[index];

      if (!addressRef) return;

      Object.keys(addressRef).forEach((field) => {
        if (field === CustomerFields.country) {
          const originalCountry = originalCustomer?.addresses[index]?.country;
          addressRef[CustomerFields.country]?.setValueExternally(
            originalCountry ? denormalizeCountryCode(originalCountry) : ''
          );

          setTimeout(() => {
            const postalCodeRef = addressRef?.postalCode;
            if (postalCodeRef && typeof postalCodeRef.setErrorExternally === 'function') {
              postalCodeRef.setErrorExternally(undefined);
            }
          }, 0);
        } else {
          const value = originalCustomer?.addresses[index]?.[field as keyof Address];

          addressRef[field as keyof Address]?.setValueExternally(
            typeof value === 'string' ? value : JSON.stringify(value ?? '')
          );
        }
      });
    });
  };

  const handleCancel = () => {
    if (originalCustomer) {
      Object.values(customerInputRefs.current).forEach((ref) => ref?.setErrorExternally?.(''));

      Object.values(addressRefs.current).forEach((addressRef) => {
        Object.values(addressRef).forEach((fieldRef) => fieldRef?.setErrorExternally?.(''));
      });
      updateCustomerState(originalCustomer);
      showToast(AppMessages.profileUpdateCancel, StatusType.success);
      resetInputFields();
    }
    setIsEditing(false);
  };
  const onAdd = async (newAddress: addAddressType) => {
    const requestBody: CustomerUpdateAction[] = [];
    requestBody.push({ action: UpdateTypes.addAddress, address: newAddress });

    try {
      let response = await updateCustomer(customer, { version: customer.version, actions: requestBody });
      if (!response || !response.addresses) {
        showToast(AppMessages.addressFetchFailure, StatusType.error);
        return;
      }
      updateCustomerState(response);
      const newAddressId = response.addresses.find(
        (addr) =>
          addr.streetName === newAddress.streetName &&
          addr.city === newAddress.city &&
          addr.postalCode === newAddress.postalCode
      )?.id;

      if (!newAddressId) {
        showToast('Failed to retrieve newly added address. Please try again.', StatusType.error);
        return;
      }
      const defaultUpdateActions: CustomerUpdateAction[] = [];
      if (newAddress.isDefaultBilling) {
        defaultUpdateActions.push({ action: UpdateTypes.setDefaultBillingAddress, addressId: newAddressId });
      }
      if (newAddress.isDefaultShipping) {
        defaultUpdateActions.push({ action: UpdateTypes.setDefaultShippingAddress, addressId: newAddressId });
      }
      if (defaultUpdateActions.length > 0) {
        response = await updateCustomer(customer, { version: response.version, actions: defaultUpdateActions });
        updateCustomerState(response);
      }
      showToast(AppMessages.addressCreationSuccess, StatusType.success);
      setSuccessMessage(AppMessages.addressCreationSuccess);
      setIsEditing(false);
    } catch (error) {
      console.error(AppMessages.addressCreationError, error);
      showToast(AppMessages.addressCreationFailure, StatusType.error);
      setErrorMessage(AppMessages.addressCreationFailure);
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveClick = (index: number) => {
    setAddressToDelete(index);
  };
  const handleCancelRemove = () => {
    setAddressToDelete(null);
  };
  const handleConfirmRemove = async () => {
    if (addressToDelete === null) return;
    const addressId = customer?.addresses[addressToDelete]?.id;
    if (!addressId) {
      showToast(AppMessages.addressDeleteFailureID, StatusType.error);
      return;
    }
    const requestBody: CustomerUpdateAction[] = [{ action: UpdateTypes.removeAddress, addressId }];

    try {
      const response = await updateCustomer(customer, { version: customer.version, actions: requestBody });

      updateCustomerState(response);
      showToast(AppMessages.addressDeleteSuccess, StatusType.success);
    } catch (error) {
      console.error(AppMessages.addressDeleteError, error);
      showToast(AppMessages.addressDeleteFailure, StatusType.error);
    } finally {
      setAddressToDelete(null);
    }
  };

  const handleSaveEdit = async (updatedAddress: Address, options: HandleSaveEditOptions = {}) => {
    if (!updatedAddress) return;

    const { isBillingDefault = false, isShippingDefault = false } = options;
    const normalizedCountryAddress = {
      ...updatedAddress,
      country: normalizeCountryInput(updatedAddress.country),
    };
    const updateActions: CustomerUpdateAction[] = [
      { action: UpdateTypes.changeAddress, addressId: updatedAddress.id!, address: normalizedCountryAddress },
    ];

    if (isBillingDefault && customer.defaultBillingAddressId !== updatedAddress.id) {
      updateActions.push({
        action: UpdateTypes.setDefaultBillingAddress,
        addressId: updatedAddress.id!,
      });
    } else if (!isBillingDefault && customer.defaultBillingAddressId === updatedAddress.id) {
      updateActions.push({
        action: UpdateTypes.setDefaultBillingAddress,
        addressId: AppMessages.emptyValidation,
      });
    }

    if (isShippingDefault && customer.defaultShippingAddressId !== updatedAddress.id) {
      updateActions.push({
        action: UpdateTypes.setDefaultShippingAddress,
        addressId: updatedAddress.id!,
      });
    } else if (!isShippingDefault && customer.defaultShippingAddressId === updatedAddress.id) {
      updateActions.push({
        action: UpdateTypes.setDefaultShippingAddress,
        addressId: AppMessages.emptyValidation,
      });
    }

    try {
      const response = await updateCustomer(JSON.parse(JSON.stringify(customer)), {
        version: customer.version,
        actions: updateActions,
      });
      updateCustomerState(response);
      window.history.go(0);
      showToast(AppMessages.addressUpdateSuccess, StatusType.success);
      if (addressToEdit) setAddressToEdit(null);
    } catch (error) {
      console.error(AppMessages.addressUpdateError, error);
      showToast(AppMessages.addressUpdateFailure, StatusType.error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <ProfileHeader />

        <div className="bg-coffeeBrown rounded-lg shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="my-3">
            <PasswordChangeButton />
          </div>
          <div className="my-3">
            <AddAddress onAdd={onAdd} handleSetDefaultAddress={handleSetDefaultAddress} />
          </div>
          {!isEditing && (
            <Button
              type="button"
              label="Edit Profile"
              onClick={() => {
                setOriginalCustomer(JSON.parse(JSON.stringify(customer)));
                setIsEditing(true);
              }}
              className="bg-amber-800 hover:bg-rustBrown text-Temptress mb-4 transition-transform duration-200 hover:scale-105"
            />
          )}
          {addressToDelete !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9998]">
              <div className="bg-coffeeBrown text-creamLight p-6 rounded-lg w-96 z-[9999]">
                <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                <p>Do you want to delete the address?</p>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-red-600 text-white p-2 rounded-md transition-transform duration-200 hover:scale-105"
                    onClick={handleConfirmRemove}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="bg-gray-600 text-white p-2 rounded-md transition-transform duration-200 hover:scale-105"
                    onClick={handleCancelRemove}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <PersonalInfoSection
              customerInputRefs={customerInputRefs}
              customer={customer}
              handleInputChange={handleInputChange}
              validationFunctions={validationFunctions}
              isEditing={isEditing}
            />

            <AddressSection
              customer={customer}
              setCustomer={setCustomer}
              isEditing={isEditing}
              handleSetDefaultAddress={handleSetDefaultAddress}
              handleRemoveClick={handleRemoveClick}
              handleSaveEdit={handleSaveEdit}
              closeModal={() => setAddressToEdit(null)}
            />

            {isEditing && (
              <div className="fixed bottom-0 left-0 w-full flex flex-col gap-4 bg-creamLight p-4 shadow-md">
                <div className="text-center">
                  <p className="text-amber-800">{AppMessages.youAreInEditMode}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    label="Cancel"
                    onClick={handleCancel}
                    className="bg-amber-800 border-creamLight text-black hover:bg-rustBrown transition-transform duration-200 hover:scale-105"
                  />
                  <Button
                    type="submit"
                    label={loading ? ButtonText.saving : ButtonText.saveChanges}
                    disabled={loading}
                    className="bg-amber-800 hover:bg-rustBrown text-Temptress transition-transform duration-200 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </form>
          {successMessage && (
            <div className="bg-green-500 text-white font-bold p-3 rounded-md shadow-lg animate-fade">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500 text-white font-bold p-3 rounded-md shadow-lg animate-fade">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
