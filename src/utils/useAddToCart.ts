import type { ProductProjection } from '@commercetools/platform-sdk';
import cartManager from '@/api/cart/CartManagerInstance';
import type { ProductInteface } from '@/data/interfaces';
import { useCart } from '@/utils/useCart';

export const useAddToCart = () => {
  const { setCart } = useCart();

  return async (product: ProductProjection | ProductInteface) => {
    try {
      await cartManager.addToCart(product);
      const updatedCart = await cartManager.getCart();

      setCart({ ...updatedCart });
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };
};
