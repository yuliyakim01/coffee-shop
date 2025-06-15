import { useContext, useEffect } from 'react';
import cartManager from '@/api/cart/CartManagerInstance';
import { CartContext } from '@/api/cart/CartContext';
import type { Cart } from '@commercetools/platform-sdk';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { setCart, initialized } = context;

  useEffect(() => {
    const init = async () => {
      await cartManager.initialize();
      const currentCart: Cart | null = await cartManager.getCart();
      setCart(currentCart);
    };

    if (!initialized) {
      init();
    }
  }, [initialized, setCart]);

  return context;
};
