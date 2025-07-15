import { getLoggedInUserFromSessionStorage, saveLoggedInUserToSessionStorage } from '@/utils/customerUtils';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { getCartQuery } from '@/utils/cartUtils';
import { anonymousId } from '@/api/cart/cart';
import { checkExistingCart } from '@/api/cart/cartAdmin';
import cartManager from '@/api/cart/CartManagerInstance';
import { useCart } from '@/utils/useCart';
import type { Cart } from '@commercetools/platform-sdk';

export const handleAfterAuthSteps = async (customer: Customer, setCart: (cart: Cart) => void) => {
  saveLoggedInUserToSessionStorage(customer, true);
  const queryParam: string = getCartQuery(getLoggedInUserFromSessionStorage(), anonymousId);

  const cartExists = await checkExistingCart(queryParam);
  cartManager.setCartIfExists(cartExists);
  if (cartExists) setCart(cartExists);
};
