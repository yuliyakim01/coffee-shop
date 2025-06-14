import React, { useMemo } from 'react';
import Button from '@/components/Login-registration-components/Button';
import { CartFields, StatusType } from '@/data/constants';
import type { AddToCartButtonProps } from '@/data/interfaces';
import { useAddToCart } from '@/utils/useAddToCart';
import { useCart } from '@/utils/useCart';
import { useRemoveFromCart } from '@/utils/useRemoveFromCart';
import { showToast } from '@/utils/profileUtils';
import handleApiError from '@/utils/handleApiError';

const CartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { isInCart, initialized } = useCart();
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  const inCart = useMemo(() => isInCart(product.id), [isInCart, product.id]);

  const handleClick = async () => {
    if (!initialized) return;

    try {
      if (inCart) {
        await removeFromCart(product);
        showToast(`${product.name} removed from cart`, StatusType.success);
      } else {
        await addToCart(product);
        showToast(`${product.name} successfully added to cart`, StatusType.success);
      }
    } catch (e) {
      showToast(`${handleApiError(e)}`, StatusType.error);
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
