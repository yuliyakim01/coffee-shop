import cartManager from '@/api/cart/CartManagerInstance';

export const useRemoveFromCart = () => {
  return async (product: { id: string }) => {
    try {
      await cartManager.removeFromCart(product.id);
    } catch (error) {
      console.error('Remove from cart failed:', error);
    }
  };
};
