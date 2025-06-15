import type { Cart, CartUpdateAction } from '@commercetools/platform-sdk';
import { CartUpdateActions } from '@/data/constants';

export const mergeCartItems = (cartList: Cart[]) => {
  const primaryCart = cartList[0];
  const updateActions: CartUpdateAction[] = [];

  if (!primaryCart.customerId) {
    const customerCart = cartList.find((cart) => cart.customerId);
    if (customerCart) {
      updateActions.push({ action: CartUpdateActions.setCustomerId, customerId: customerCart.customerId });
    }
  }

  if (primaryCart.customerId && primaryCart.anonymousId) {
    updateActions.push({ action: CartUpdateActions.setAnonymousId, anonymousId: undefined });
    localStorage.removeItem('anonymousId');
  }

  cartList.slice(1).forEach((cart) => {
    cart.lineItems.forEach((lineItem) => {
      const existingItem = primaryCart.lineItems.find((item) => item.productId === lineItem.productId);
      if (existingItem) {
        const newQuantity = Math.max(existingItem.quantity, lineItem.quantity);
        if (existingItem.quantity < newQuantity) {
          updateActions.push({
            action: CartUpdateActions.changeLineItemQuantity,
            lineItemId: existingItem.id,
            quantity: newQuantity,
          });
        }
      } else {
        updateActions.push({
          action: CartUpdateActions.addLineItem,
          productId: lineItem.productId,
          variantId: lineItem.variant.id,
          quantity: lineItem.quantity,
        });
      }
    });
  });
  return { primaryCart, cartUpdate: { version: primaryCart.version, actions: updateActions } };
};
