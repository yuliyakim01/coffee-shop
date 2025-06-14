import { useCallback } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '@/api/customers';
import type { CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { handleAfterAuthSteps } from '@/utils/handleAfterAuthSteps';
import { ROUTES } from '@/data/routes';

export function useRegistration(): {
  register: (customerDraft: CustomerDraft) => Promise<void>;
} {
  const navigate: NavigateFunction = useNavigate();

  const register: (customerDraft: CustomerDraft) => Promise<void> = useCallback(
    async (customerDraft: CustomerDraft): Promise<void> => {
      try {
        const response: CustomerSignInResult = await registerCustomer(customerDraft);

        if (response.customer) {
          handleAfterAuthSteps(response.customer);
          setTimeout(() => {
            navigate(ROUTES.main);
          }, 2000);
        } else {
          throw new Error('Registration failed: No customer returned.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    []
  );

  return { register };
}
