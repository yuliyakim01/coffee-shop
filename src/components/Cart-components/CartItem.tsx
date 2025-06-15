// components/CartItem.js
import React from 'react';

type CartItemType = {
  id: string | number;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

type CartItemProps = {
  item: CartItemType;
  onDecrease: (id: string | number) => void;
  onIncrease: (id: string | number) => void;
  onRemove: (id: string | number) => void;
};

const CartItem: React.FC<CartItemProps> = ({ item, onDecrease, onIncrease, onRemove }) => {
  return (
    <div className="  p-4 sm:p-6 flex flex-col sm:flex-row items-center">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md mr-4 mb-4 sm:mb-0">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center" />
      </div>

      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-2 sm:mb-0">
            <h3 className="text-lg font-medium text-Temptress">{item.name}</h3>
            <p className="text-brown">${item.price.toFixed(2)}</p>
          </div>

          <div className="flex items-center">
            <div className="flex items-center border border-whiteCoffee rounded-md">
              <button
                className="px-3 py-1 text-brown hover:bg-cream transition"
                aria-label="Decrease quantity"
                onClick={() => onDecrease(item.id)}
              >
                -
              </button>
              <span className="px-3 py-1 text-Temptress">{item.quantity}</span>
              <button
                className="px-3 py-1 text-brown hover:bg-cream transition"
                aria-label="Increase quantity"
                onClick={() => onIncrease(item.id)}
              >
                +
              </button>
            </div>

            <button
              className="ml-4 text-rustBrown hover:text-LightTaupe transition"
              aria-label="Remove item"
              onClick={() => onRemove(item.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
