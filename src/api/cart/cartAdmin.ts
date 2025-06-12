import { getApiRoot } from '@/utils/getApiRoot';
import type { Cart, CartPagedQueryResponse, ClientResponse } from '@commercetools/platform-sdk';

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
