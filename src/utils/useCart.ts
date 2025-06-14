import { useContext, useEffect } from 'react';
import cartManager from '@/api/cart/CartManagerInstance';
import { CartContext } from '@/api/cart/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  const { cart, setCart, initialized, isInCart } = context;

  useEffect(() => {
    const init = async () => {
      await cartManager.initialize();
      const currentCart = await cartManager.getCart();
      if (currentCart === null) console.log('useCart, cart is null!');
      if (currentCart) setCart(currentCart);
      if (currentCart !== null) console.log('useCart, cart is not null!');
    };

    if (!initialized) {
      init();
    }
  }, [initialized, setCart]);

  return context;
};
