import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { loginCustomer } from '@/api/customers';
import { normalizeInput, saveLoggedInUserToSessionStorage } from '@/utils/customerUtils';
import { ROUTES } from '@/data/routes';
import type { FormRefItem, SignInResponse } from '@/data/interfaces';

export function useAuth(): { loginWithRefs: (emailRef: FormRefItem, passwordRef: FormRefItem) => Promise<void> } {
  const navigate: NavigateFunction = useNavigate();

  const loginWithRefs: (emailRef: FormRefItem, passwordRef: FormRefItem) => Promise<void> = useCallback(
    async (emailRef: FormRefItem, passwordRef: FormRefItem): Promise<void> => {
      const email: string = normalizeInput(emailRef.current?.getValue?.() ?? '');
      const password: string = normalizeInput(passwordRef.current?.getValue?.() ?? '');

      const response: SignInResponse = await loginCustomer(email, password);

      if (response.customer) {
        setTimeout((): void => {
          navigate(ROUTES.main);
        }, 2000);

        saveLoggedInUserToSessionStorage(response.customer);
      } else {
        throw new Error('Login failed');
      }
    },
    [navigate]
  );

  return { loginWithRefs };
}
