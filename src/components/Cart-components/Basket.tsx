import React, { useEffect, useState } from 'react';
import cartManager from '@/api/cart/CartManagerInstance';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import OrderSummary from './OrderSummary';
import PromoCode from './Promocode';

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
    return <p>🛒 No items in your cart.</p>;
  }

  const totalPrice = cart.lineItems.reduce((acc, item) => acc + item.price.value.centAmount * item.quantity, 0);

  return (
    <div>
      <div>
        <h2>🛍 Your Basket</h2>
        <h3>
          Total: {totalPrice / 100} {cart.lineItems[0].price.value.currencyCode}
        </h3>
        <ul>
          {cart.lineItems.map((item: LineItem) => (
            <li key={item.id}>
              <p>{item.quantity}</p>
              <p>{item.productKey}</p>
              <strong>{item.productId}</strong> - {item.price.value.centAmount / 100} {item.price.value.currencyCode} x{' '}
              {item.quantity}
            </li>
          ))}
        </ul>
        <h3>
          Total: {totalPrice / 100} {cart.lineItems[0].price.value.currencyCode}
        </h3>
      </div>{' '}
      <PromoCode />
      <OrderSummary subtotal={totalPrice / 100} shipping={0} total={totalPrice / 100} />
    </div>
  );
};

export default Basket;
