import { useEffect, useState } from 'react';
import cartManager from '@/api/cart/CartManagerInstance';

export const useCart = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const init = async () => {
      await cartManager.initialize();
      setInitialized(true);
    };
    init();
  }, []);

  const isInCart = (productId: string) => cartManager.isInCart(productId);

  return { isInCart, initialized };
};
