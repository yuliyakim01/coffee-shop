import type { NavigateFunction } from 'react-router-dom';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { loginCustomer } from '@/api/customers';
import { normalizeInput } from '@/utils/customerUtils';
import type { FormRefItem, SignInResponse } from '@/data/interfaces';
import { handleAfterAuthSteps } from '@/utils/handleAfterAuthSteps';
import { ROUTES } from '@/data/routes';
import { useCart } from '@/utils/useCart';

export function useAuth(): {
  loginWithRefs: (emailRef: FormRefItem, passwordRef: FormRefItem) => Promise<void>;
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const navigate: NavigateFunction = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { cart, setCart } = useCart();

  const loginWithRefs = useCallback(async (emailRef: FormRefItem, passwordRef: FormRefItem): Promise<void> => {
    const email = normalizeInput(emailRef.current?.getValue?.() ?? '');
    const password = normalizeInput(passwordRef.current?.getValue?.() ?? '');

    const response: SignInResponse = await loginCustomer(email, password);

    if (response.customer) {
      setIsAuthorized(true);
      await handleAfterAuthSteps(response.customer, setCart);
      setTimeout(() => {
        navigate(ROUTES.main);
      }, 2000);
    } else {
      setIsAuthorized(false);
      throw new Error('Login failed');
    }
  }, []);
  return { loginWithRefs, isAuthorized, setIsAuthorized };
}
