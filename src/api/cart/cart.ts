import type { ByProjectKeyMeCartsRequestBuilder, Cart, CartDraft, ClientResponse } from '@commercetools/platform-sdk';
import { getApiRootMyCart } from '@/api/cart/commerceToolsClientAnonymous';
import { getOrCreateAnonymousId } from '@/utils/cartUtils';

export const anonymousId: string = getOrCreateAnonymousId();
const cartEndpoint: ByProjectKeyMeCartsRequestBuilder = getApiRootMyCart().me().carts();

export const createCart = async (cartDraft: CartDraft) => {
  try {
    const response: ClientResponse<Cart> = await cartEndpoint.post({ body: cartDraft }).execute();
    return response.body;
  } catch (error) {
    console.error('Failed to create a new cart:', error);
    throw error;
  }
};
