import type { Cart, CartDraft, LineItem, ProductProjection } from '@commercetools/platform-sdk';
import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import type { CartProduct, SessionUser } from '@/data/interfaces';
import type { ProductInteface } from '@/data/interfaces';
import { CartFields, CartUpdateActions } from '@/data/constants';

export const convertToCartProduct = (product: ProductProjection | ProductInteface): CartProduct => {
  return {
    id: product.id,
    variantId: 'variants' in product ? product.masterVariant.id : product.variantId,
  };
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

export const findLineItem = (product: CartProduct, cart: Cart) => {
  const index: number = cart?.lineItems.findIndex((item) => item.id === product.id) ?? -1;
  return index >= 0 ? cart?.lineItems[index] : null;
};

export const createCartDraft = (product: ProductProjection | ProductInteface, user: SessionUser | null) => {
  const draftProduct = convertToCartProduct(product);
  return {
    currency: CartFields.usd,
    lineItems: [{ quantity: 1, productId: product.id, variantId: draftProduct.variantId }],
    customerId: user ? user.customerId : undefined,
  } as CartDraft;
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
