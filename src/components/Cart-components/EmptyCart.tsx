// components/EmptyCart.js
import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="text-center py-12">
      <p className="text-brown text-xl mb-4">Your cart is empty</p>
      <Link
        to="/products"
        className="inline-block bg-LightTaupe text-creamLight px-6 py-2 rounded-full hover:bg-rustBrown transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;
