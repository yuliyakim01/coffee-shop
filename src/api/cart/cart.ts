import type { ByProjectKeyMeCartsRequestBuilder, Cart, CartDraft, ClientResponse } from '@commercetools/platform-sdk';
import { getApiRootMyCart } from '@/api/cart/commerceToolsClientAnonymous';
import { getOrCreateAnonymousId } from '@/utils/cartUtils';
import handleApiError from '@/utils/handleApiError';
import { getApiRoot } from '@/utils/getApiRoot';

export const anonymousId: string = getOrCreateAnonymousId();
const cartEndpoint: ByProjectKeyMeCartsRequestBuilder = getApiRootMyCart();

export const createCart = async (cartDraft: CartDraft) => {
  try {
    const response: ClientResponse<Cart> = await cartEndpoint.post({ body: cartDraft }).execute();
    return response.body;
  } catch (error) {
    console.log(JSON.stringify(getApiRootMyCart()));
    console.error('Failed to create a new cart:', handleApiError(error));
    throw error;
  }
};
