import React, { useEffect, useState } from 'react';
import cartManager from '@/api/cart/CartManagerInstance';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import OrderSummary from './OrderSummary';
import PromoCode from './Promocode';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';

const Basket: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);

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

  const removeItem = (id: string) => {
    cartManager.removeFromCart(id).then(() => {
      setCart((prevCart) => {
        if (!prevCart) return prevCart;
        return {
          ...prevCart,
          lineItems: prevCart.lineItems.filter((item) => item.id !== id),
        };
      });
    });
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
                onDecrease={() => {}}
                onIncrease={() => {}}
                onRemove={removeItem}
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
