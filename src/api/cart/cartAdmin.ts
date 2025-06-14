import { getApiRoot } from '@/utils/getApiRoot';
import type { Cart, CartPagedQueryResponse, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';

const cartEndpoint = getApiRoot().carts();

export const checkExistingCart = async (whereClause: string): Promise<Cart | undefined> => {
  try {
    const response: ClientResponse<CartPagedQueryResponse> = await cartEndpoint
      .get({ queryArgs: { where: whereClause } })
      .execute();

    return response.body.results[0];
  } catch (error) {
    console.error('Error checking cart:', error);
    throw error;
  }
};
export const updateCart = async (cart: Cart, body: MyCartUpdate) => {
  try {
    const response: ClientResponse<Cart> = await cartEndpoint.withId({ ID: cart.id }).post({ body }).execute();
    return response.body;
  } catch (error) {
    console.error('Failed to update cart:', error);
    throw error;
  }
};
