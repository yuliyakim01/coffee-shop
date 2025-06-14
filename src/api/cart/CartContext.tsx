import React, { createContext, useEffect, useMemo, useState } from 'react';
import type { Cart } from '@commercetools/platform-sdk';
import cartManager from '@/api/cart/CartManagerInstance';

type CartContextType = {
  cart: Cart | null;
  initialized: boolean;
  isInCart: (productId: string) => boolean;
  setCart: (cart: Cart) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await cartManager.initialize();
      const currentCart = await cartManager.getCart();
      setCart(currentCart);
      setInitialized(true);
    };

    if (!initialized) {
      init();
    }
  }, [initialized]);

  const isInCart = (productId: string) => {
    if (!cart) return false;
    return cart.lineItems.some((item) => item.productId === productId && item.quantity > 0);
  };
  const value = useMemo(
    () => ({
      cart,
      initialized,
      isInCart,
      setCart,
    }),
    [cart, initialized]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
