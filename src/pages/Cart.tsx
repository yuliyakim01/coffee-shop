// pages/Cart.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CartItem from '../components/Cart-components/CartItem';
import OrderSummary from '../components/Cart-components/OrderSummary';
import EmptyCart from '../components/Cart-components/EmptyCart';
import PromoCode from '@/components/Cart-components/Promocode';

const Cart = () => {
  // Sample cart data with state
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium Coffee Beans',
      price: 12.99,
      quantity: 2,
      image: 'https://via.placeholder.com/80?text=Coffee',
    },
    {
      id: 2,
      name: 'Artisan Tea Set',
      price: 24.95,
      quantity: 1,
      image: 'https://via.placeholder.com/80?text=Tea',
    },
    {
      id: 3,
      name: 'Ceramic Mug',
      price: 18.5,
      quantity: 3,
      image: 'https://via.placeholder.com/80?text=Mug',
    },
  ]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 5.99;
  const total = subtotal + shipping;

  const handleIncrease = (id: string | number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  };

  const handleDecrease = (id: string | number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item))
    );
  };

  const handleRemove = (id: string | number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-rustBrown py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-Temptress mb-8 text-center">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="shadow-md  rounded-lg  mb-8">
            <div className="rounded-lg  bg-cream">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              ))}
            </div>
            <PromoCode />

            <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
