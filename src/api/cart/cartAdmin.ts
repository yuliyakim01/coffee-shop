import { getApiRoot } from '@/utils/getApiRoot';
import type {
  Cart,
  CartPagedQueryResponse,
  CartUpdate,
  ClientResponse,
  MyCartUpdate,
} from '@commercetools/platform-sdk';
import type { MergeCartType } from '@/data/interfaces';
import { mergeCartItems } from '@/utils/mergeCartUtils';
import cartManager from '@/api/cart/CartManagerInstance';

const cartEndpoint = getApiRoot().carts();

export const checkExistingCart = async (whereClause: string): Promise<Cart | undefined> => {
  try {
    const response: ClientResponse<CartPagedQueryResponse> = await cartEndpoint
      .get({ queryArgs: { where: whereClause } })
      .execute();
    let cartArray: Cart[] = [...response.body.results];
    const currentCart = await cartManager.getCart();
    if (currentCart !== null) cartArray.push(currentCart);
    if (response.body.results.length > 1) {
      const prepForJoin: MergeCartType = mergeCartItems(response.body.results);
      const joinedCart = await updateCart(prepForJoin.primaryCart, prepForJoin.cartUpdate);
      await deleteOldCarts(response.body.results, prepForJoin.primaryCart);
      return joinedCart;
    } else if (response.body.results.length === 1) return response.body.results[0];
    else return undefined;
  } catch (error) {
    console.error('Error checking cart:', error);
    throw error;
  }
};
export const updateCart = async (cart: Cart, body: MyCartUpdate | CartUpdate) => {
  try {
    const response: ClientResponse<Cart> = await cartEndpoint.withId({ ID: cart.id }).post({ body }).execute();
    return response.body;
  } catch (error) {
    console.error('Failed to update cart:', error);
    throw error;
  }
};
export const deleteCart = async (cart: Cart) => {
  try {
    const response: ClientResponse<Cart> = await cartEndpoint
      .withId({ ID: cart.id })
      .delete({ queryArgs: { version: cart.version } })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw error;
  }
};
const deleteOldCarts = async (cartList: Cart[], primaryCart: Cart) => {
  const cartsToDelete = cartList.filter((cart) => cart.id !== primaryCart.id);
  for (const cart of cartsToDelete) {
    await deleteCart(cart);
  }
};
