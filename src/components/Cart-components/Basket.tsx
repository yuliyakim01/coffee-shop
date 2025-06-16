import React, { useEffect, useState, useContext } from 'react';
import cartManager, { fetchPromoCodeString } from '@/api/cart/CartManagerInstance';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import OrderSummary from './OrderSummary';
import PromoCode from './PromoCode';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { CartContext } from '@/api/cart/CartContext';

const Basket: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [promoCodeLabel, setPromoCodeLabel] = useState<string | null>(null);
  const context = useContext(CartContext);

  useEffect(() => {
    const fetchCart = async () => {
      await cartManager.initialize();
      const currentCart = await cartManager.getCart();
      setCart(currentCart);
    };
    fetchCart();
  }, []);

  const refreshCartState = async () => {
    await context?.refreshCart?.();
    const updated = await cartManager.getCart();
    setCart(updated);
  };

  // Always compute values BEFORE conditional returns to avoid hook mismatches
  const appliedCodeRef = cart?.discountCodes?.[0]?.discountCode?.id ?? null;

  useEffect(() => {
    const loadPromoCode = async () => {
      if (appliedCodeRef) {
        const label = await fetchPromoCodeString(appliedCodeRef);
        setPromoCodeLabel(label);
      } else {
        setPromoCodeLabel(null);
      }
    };
    loadPromoCode();
  }, [appliedCodeRef]);

  if (!cart || cart.lineItems.length === 0) {
    return <EmptyCart />;
  }

  const calculateSalePrice = (item: LineItem) => {
    const attributes = item.variant?.attributes || [];
    const isSale = attributes.find((attr) => attr.name === 'is_sale')?.value;
    const salePercent = attributes.find((attr) => attr.name === 'sale_percent')?.value;
    const originalPrice = item.price.value.centAmount / 100;

    if (isSale && salePercent) {
      return +(originalPrice * (1 - salePercent / 100)).toFixed(2);
    }

    return originalPrice;
  };

  const totalPrice = cart.lineItems.reduce((acc, item) => {
    const price = calculateSalePrice(item);
    return acc + price * item.quantity;
  }, 0);

  const cartTotal = cart.totalPrice.centAmount / 100;
  const discountAmount = +(totalPrice - cartTotal).toFixed(2);
  const hasPromo = !!appliedCodeRef && discountAmount > 0;

  const removeItem = async (productId: string) => {
    try {
      const updatedCart = await cartManager.removeFromCart(productId);
      setCart(updatedCart ?? (await cartManager.getCart()));
      await context?.refreshCart();
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };

  const increaseQuantity = async (lineItemId: string) => {
    try {
      const updatedCart = await cartManager.increaseQuantity(lineItemId);
      setCart(updatedCart ?? (await cartManager.getCart()));
    } catch (error) {
      console.error('Failed to increase quantity:', error);
    }
  };

  const decreaseQuantity = async (lineItemId: string) => {
    try {
      const updatedCart = await cartManager.decreaseQuantity(lineItemId);
      setCart(updatedCart ?? (await cartManager.getCart()));
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
    }
  };

  return (
    <div className="p-4 bg-coffeeBrown grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-cream px-6 py-5 rounded-lg border-2 border-whiteCoffee shadow-lg">
        <h2 className="text-2xl font-bold text-Temptress mb-4">🛍 Your Basket</h2>
        <ul className="space-y-4">
          {cart.lineItems.map((item: LineItem) => {
            const attributes = item.variant?.attributes || [];
            const isSale = !!attributes.find((attr) => attr.name === 'is_sale')?.value;
            const salePercent = attributes.find((attr) => attr.name === 'sale_percent')?.value || 0;
            const originalPrice = +(item.price.value.centAmount / 100).toFixed(2);
            const discountPrice = +(item.totalPrice.centAmount / 100).toFixed(2);
            const name = Object.values(item.name)[0];

            return (
              <CartItem
                key={item.id}
                item={{
                  id: item.id,
                  name,
                  image: item.variant?.images?.[0]?.url || 'https://via.placeholder.com/150',
                  quantity: item.quantity,
                  isSale,
                  salePercent,
                  originalPrice,
                  discountPrice,
                }}
                onDecrease={() => decreaseQuantity(item.id)}
                onIncrease={() => increaseQuantity(item.id)}
                onRemove={() => removeItem(item.productId)}
              />
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <PromoCode onChange={refreshCartState} />

        <OrderSummary
          subtotal={totalPrice}
          shipping={0}
          total={cartTotal}
          promoAmount={hasPromo ? discountAmount : 0}
          promoCode={hasPromo ? (promoCodeLabel ?? '') : ''}
        />
      </div>
    </div>
  );
};

export default Basket;
