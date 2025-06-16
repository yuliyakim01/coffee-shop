import React from 'react';
import { Link } from 'react-router-dom';

type OrderSummaryProps = {
  subtotal: number;
  shipping: number;
  total: number;
  promoAmount?: number;
  promoCode?: string;
};

const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, total, promoAmount = 0, promoCode }) => {
  return (
    <div className="bg-cream mt-5 px-6 py-4 rounded-lg border-2 border-whiteCoffee shadow-lg rounded-b-lg">
      <h2 className="text-xl font-semibold text-Temptress mb-4 border-b-2 border-whiteCoffee pb-2">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between pb-2 border-b border-whiteCoffee/50">
          <span className="text-brown">Subtotal</span>
          <span className="text-Temptress font-medium">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pb-2 border-b border-whiteCoffee/50">
          <span className="text-brown">Shipping</span>
          <span className="text-Temptress font-medium">${shipping.toFixed(2)}</span>
        </div>

        {promoAmount > 0 && promoCode && (
          <div className="flex justify-between pb-2 border-b border-whiteCoffee/50">
            <span className="text-green-700 font-medium">
              <strong>{promoCode}</strong> Discount Applied
            </span>
            <span className="text-green-700 font-medium">–${promoAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between pt-3 border-t-2 border-whiteCoffee mt-2">
          <span className="text-brown font-semibold text-lg">Total</span>
          <span className="text-Temptress font-bold text-lg">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 [&>*]:shadow-md [&>*:hover]:shadow-lg">
        <Link
          to="/products"
          className="flex-1 text-center bg-cream border-2 border-LightTaupe text-LightTaupe px-6 py-3 rounded-md hover:bg-LightTaupe hover:text-creamLight transition-all duration-300"
        >
          Continue Shopping
        </Link>
        <button className="flex-1 bg-LightTaupe text-creamLight px-6 py-3 rounded-md border-2 border-LightTaupe hover:bg-rustBrown hover:border-rustBrown transition-all duration-300 shadow-md">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
