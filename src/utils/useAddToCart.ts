import type { ProductProjection } from '@commercetools/platform-sdk';
import cartManager from '@/api/cart/CartManagerInstance';
import type { ProductInteface } from '@/data/interfaces';

export const useAddToCart = () => {
  return async (product: ProductProjection | ProductInteface) => {
    try {
      await cartManager.addToCart(product);
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };
};
