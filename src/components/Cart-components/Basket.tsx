import React, { useEffect, useState, useContext } from 'react';
import cartManager from '@/api/cart/CartManagerInstance';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import OrderSummary from './OrderSummary';
import PromoCode from './Promocode';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { CartContext } from '@/api/cart/CartContext';

const Basket: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const context = useContext(CartContext);
  useEffect(() => {
    const fetchCart = async () => {
      await cartManager.initialize();
      const currentCart = await cartManager.getCart();
      setCart(currentCart);
    };
    fetchCart();
  }, []);

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

  const removeItem = async (id: string) => {
    try {
      const updatedCart = await cartManager.removeFromCart(id);
      if (updatedCart) {
        setCart(updatedCart);
        await context?.refreshCart();
      } else {
        const freshCart = await cartManager.getCart();
        setCart(freshCart);
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    }
  };
  const increaseQuantity = async (lineItemId: string) => {
    try {
      const updatedCart = await cartManager.increaseQuantity(lineItemId);
      if (updatedCart) {
        setCart(updatedCart);
      } else {
        const freshCart = await cartManager.getCart();
        setCart(freshCart);
      }
    } catch (error) {
      console.error('Failed to increase quantity:', error);
      // Optionally show error to user
    }
  };

  const decreaseQuantity = async (lineItemId: string) => {
    try {
      const updatedCart = await cartManager.decreaseQuantity(lineItemId);
      if (updatedCart) {
        setCart(updatedCart);
      } else {
        const freshCart = await cartManager.getCart();
        setCart(freshCart);
      }
    } catch (error) {
      console.error('Failed to decrease quantity:', error);
      // Optionally show error to user
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
            const discountPrice = calculateSalePrice(item);
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
        <PromoCode />
        <OrderSummary subtotal={totalPrice} shipping={0} total={totalPrice} />
      </div>
    </div>
  );
};

export default Basket;
