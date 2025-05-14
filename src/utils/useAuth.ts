import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { loginCustomer } from '@/api/customers';
import { normalizeInput } from '@/utils/customerUtils';
import type { CustomerSignInResult } from '@commercetools/platform-sdk';
import { ROUTES } from '@/data/routes';

export function useAuth(): { login: (email: string, password: string) => Promise<void> } {
  const navigate: NavigateFunction = useNavigate();

  const login: (email: string, password: string) => Promise<void> = useCallback(
    async (email: string, password: string): Promise<void> => {
      const response: CustomerSignInResult = await loginCustomer(normalizeInput(email), normalizeInput(password));

      if (response.customer) {
        setTimeout((): void => {
          navigate(ROUTES.main);
        }, 2000);

        saveToSessionStorage('customerId', response.customer.id);
        saveToSessionStorage('customerVersion', `${response.customer.version}`);
      } else {
        throw new Error('login failed');
      }
    },
    [navigate]
  );

  return { login };
}

function saveToSessionStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}
