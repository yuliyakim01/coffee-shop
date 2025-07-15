import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { CartProvider, CartContext } from '@/api/cart/CartContext';
import cartManager from '@/api/cart/CartManagerInstance';

jest.mock('@/api/cart/CartManagerInstance');

const sampleCart = {
  id: 'abc',
  lineItems: [{ productId: 'p1', quantity: 2 }],
} as any;

describe('CartProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (cartManager.initialize as jest.Mock).mockResolvedValue(undefined);
    (cartManager.getCart as jest.Mock).mockResolvedValue(sampleCart);
  });

  it('initializes cart and sets context values', async () => {
    let context: any;

    const TestConsumer = () => {
      context = React.useContext(CartContext);
      return null;
    };

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => {
      expect(context.initialized).toBe(true);
      expect(context.cart).toEqual(sampleCart);
      expect(context.isInCart('p1')).toBe(true);
    });
  });

  it('refreshCart updates the cart state', async () => {
    const newCart = { id: 'refreshed', lineItems: [] };
    (cartManager.getCart as jest.Mock).mockResolvedValueOnce(sampleCart);
    (cartManager.getCart as jest.Mock).mockResolvedValueOnce(newCart);

    let context: any;
    const TestConsumer = () => {
      context = React.useContext(CartContext);
      return null;
    };

    render(
      <CartProvider>
        <TestConsumer />
      </CartProvider>
    );

    await waitFor(() => expect(context.initialized).toBe(true));

    await waitFor(async () => {
      await context.refreshCart();
      expect(context.cart).toEqual(newCart);
    });
  });
});
