import cartManager from '@/api/cart/CartManagerInstance';
import { useCart } from '@/utils/useCart';

export const useRemoveFromCart = () => {
  const { cart, setCart } = useCart();

  return async (product: { id: string }) => {
    try {
      await cartManager.removeFromCart(product.id);
      const updatedCart = await cartManager.getCart();

      setCart((prevCart) => ({ ...updatedCart }));
    } catch (error) {
      console.error('Remove from cart failed:', error);
    }
  };
};
