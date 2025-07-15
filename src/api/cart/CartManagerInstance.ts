import CartManager from '@/api/cart/CartManager';
import { getApiRoot } from '@/api/commerceToolsClient';

const cartManager = new CartManager();

export async function fetchPromoCodeString(id: string): Promise<string | null> {
  try {
    const result = await getApiRoot().discountCodes().withId({ ID: id }).get().execute();
    return result.body.code;
  } catch (e) {
    console.error('Failed to fetch promo code string:', e);
    return null;
  }
}

export default cartManager;
