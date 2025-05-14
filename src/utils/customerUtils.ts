import type { User } from '@/data/interfaces';
import type { CustomerDraft } from '@commercetools/platform-sdk';

export function createCustomerDraft(user: User, useAsDefaultAddress: boolean): CustomerDraft {
  return {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
    ...(user.address && {
      addresses: [user.address],
      defaultShippingAddress: useAsDefaultAddress ? 0 : undefined,
      defaultBillingAddress: useAsDefaultAddress ? 0 : undefined,
    }),
    isEmailVerified: true,
  };
}
export function normalizeInput(userInput: string) {
  return userInput.trim();
}
