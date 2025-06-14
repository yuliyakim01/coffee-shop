import React, { useEffect, useState } from 'react';
import Button from '@/components/Login-registration-components/Button';
import { AppMessages, CartFields, StatusType } from '@/data/constants';
import type { AddToCartButtonProps, CartProduct, ProductInteface } from '@/data/interfaces';
import { Cart, ProductProjection } from '@commercetools/platform-sdk';
import { useAddToCart } from '@/utils/useAddToCart';
import { useCart } from '@/utils/useCart';
import { useRemoveFromCart } from '@/utils/useRemoveFromCart';

const CartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { isInCart, initialized } = useCart();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const inCart = isInCart(product.id);

  const handleClick = async () => {
    if (!initialized) return;

    try {
      if (inCart) {
        await removeFromCart(product);
        // TODO: show toast "Removed from cart"
      } else {
        await addToCart(product);
        // TODO: show toast "Added to cart"
      }
    } catch (e) {
      // TODO: show toast "Something went wrong"
    }
  };

  return (
    <Button
      type="button"
      onClick={handleClick}
      label={inCart ? CartFields.removeFromCart : CartFields.addToCart}
      className={`text-black border-4 ${inCart ? 'border-green-300' : 'border-red-300'}`}
    />
  );
};
export default CartButton;
