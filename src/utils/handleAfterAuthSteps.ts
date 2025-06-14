import { saveLoggedInUserToSessionStorage } from '@/utils/customerUtils';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

export const handleAfterAuthSteps = (customer: Customer) => {
  saveLoggedInUserToSessionStorage(customer, true);
};
