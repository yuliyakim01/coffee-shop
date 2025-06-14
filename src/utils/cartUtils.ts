import type { Cart, CartDraft, LineItem, ProductProjection } from '@commercetools/platform-sdk';
import type { CartProduct, SessionUser } from '@/data/interfaces';
import type { ProductInteface } from '@/data/interfaces';
import { CartFields, CartUpdateActions } from '@/data/constants';

export const convertToCartProduct = (product: ProductProjection | ProductInteface): CartProduct => {
  return {
    id: product.id,
    variantId: 'variants' in product ? product.masterVariant.id : product.variantId,
  } as CartProduct;
};
export const createCartDraft = (product: ProductProjection | ProductInteface, user: SessionUser | null) => {
  const draftProduct = convertToCartProduct(product);
  const id = getOrCreateAnonymousId();
  const owner = user !== null ? `customerId: ${user?.customerId}` : `anonymousId: ${id}`;
  return {
    currency: CartFields.usd,
    lineItems: [{ quantity: 1, productId: product.id, variantId: draftProduct.variantId }],
    owner,
  } as CartDraft;
};
export const createEmptyCartDraft = (anonymousId?: string, customerId?: string) => {
  return {
    currency: CartFields.usd,
    customerId: customerId,
    anonymousId: anonymousId,
  } as CartDraft;
};
export const buildLineItemActionAdd = (product: CartProduct, lineItem: LineItem | null | undefined) => {
  const { id: productId, variantId } = product;

  if (lineItem) {
    return {
      action: CartUpdateActions.changeLineItemQuantity,
      lineItemId: lineItem.id,
      quantity: lineItem.quantity + 1,
    };
  }
  return {
    action: CartUpdateActions.addLineItem,
    productId,
    variantId,
    quantity: 1,
  };
};
export const buildLineItemActionReduce = (product: CartProduct, lineItem: LineItem | null | undefined) => {
  const { id: productId, variantId } = product;
  if (!lineItem) throw new Error('Cannot reduce amount of product that does not exist');
  if (lineItem.quantity <= 1) throw new Error('You reached the minimum quantity of 1');
  return {
    action: CartUpdateActions.changeLineItemQuantity,
    lineItemId: lineItem.id,
    quantity: lineItem.quantity - 1,
  };
};

export const buildLineItemActionRemove = (product: CartProduct, lineItem: LineItem | null | undefined) => {
  const { id: productId, variantId } = product;
  if (!lineItem) throw new Error('Cannot remove lineItem, it does not exist');
  return {
    action: CartUpdateActions.removeLineItem,
    lineItemId: lineItem.id,
  };
};
export const findLineItem = (productId: string, cart: Cart) => {
  const index: number = cart?.lineItems.findIndex((item) => item.productId === productId) ?? -1;
  return index >= 0 ? cart?.lineItems[index] : null;
};

export const getOrCreateAnonymousId = (): string => {
  let id = localStorage.getItem(CartFields.anonymousId);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(CartFields.anonymousId, id);
  }
  return id;
};

export const resetAnonymousId = async (): Promise<string> => {
  localStorage.removeItem(CartFields.anonymousId);
  const newId = crypto.randomUUID();
  localStorage.setItem(CartFields.anonymousId, newId);
  return newId;
};
