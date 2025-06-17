import React, { useEffect, useState, useContext } from 'react';
import { BeatLoader } from 'react-spinners';
import cartManager, { fetchPromoCodeString } from '@/api/cart/CartManagerInstance';
import type { Cart, LineItem } from '@commercetools/platform-sdk';
import OrderSummary from './OrderSummary';
import PromoCode from './PromoCode';
import EmptyCart from './EmptyCart';
import CartItem from './CartItem';
import { CartContext } from '@/api/cart/CartContext';
import ClearCartModal from './ClearCartModal';
import RunningPromoCodes from './RunningPromoCodes';

const Basket: React.FC = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [promoCodeLabel, setPromoCodeLabel] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(CartContext);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);

  const handleClearCart = async () => {
    setIsLoading(true);
    const cleared = await cartManager.clearCart();
    setCart(cleared ?? (await cartManager.getCart()));
    await context?.refreshCart?.();
    setIsClearModalOpen(false);
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        await cartManager.initialize();
        const currentCart = await cartManager.getCart();
        setCart(currentCart);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  const refreshCartState = async () => {
    setIsLoading(true);
    await context?.refreshCart?.();
    const updated = await cartManager.getCart();
    setCart(updated);
    setIsLoading(false);
  };

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-coffeeBrown">
        <BeatLoader color="#6F4E37" size={20} />
      </div>
    );
  }

  if (!cart || cart.lineItems.length === 0) {
    return <EmptyCart />;
  }

  const calculateSalePrice = (item: LineItem) => {
    const attributes = item.variant?.attributes || [];
    const isSale = attributes.find((attr) => attr.name === 'is_sale')?.value;
    const salePercent = attributes.find((attr) => attr.name === 'sale_percent')?.value;
    const originalPrice = item.price.value.centAmount / 100;
    return isSale && salePercent ? +(originalPrice * (1 - salePercent / 100)).toFixed(2) : originalPrice;
  };

  const cartTotal = cart.totalPrice.centAmount / 100;
  const discountAmount = +((cart.discountOnTotalPrice?.discountedAmount?.centAmount ?? 0) / 100).toFixed(2);
  const totalPrice = cartTotal + discountAmount;
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
    <div className="bg-coffeeBrown relative">
      <RunningPromoCodes />
      <div className="py-20 px-4  grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-cream px-6 py-5 rounded-lg border-2 border-whiteCoffee shadow-lg flex flex-col justify-between">
          <div>
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

          <div className="mt-6">
            <button
              onClick={() => setIsClearModalOpen(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition shadow-md w-fit"
            >
              🗑️ Clear Shopping Cart
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <PromoCode onChange={refreshCartState} />
          <OrderSummary
            subtotal={totalPrice}
            shipping={0}
            total={cartTotal}
            promoAmount={hasPromo ? discountAmount : 0}
          />
        </div>
      </div>

      <ClearCartModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
      />
    </div>
  );
};

export default Basket;
