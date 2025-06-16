import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '@/api/cart/CartContext';
import cartManager from '@/api/cart/CartManagerInstance';
import { showToast } from '@/utils/profileUtils';
import { StatusType } from '@/data/constants';

type PromoCodeProps = {
  onChange?: () => void;
};

const PromoCode: React.FC<PromoCodeProps> = ({ onChange }) => {
  const [code, setCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    // On load, check if a promo code is already applied
    const checkApplied = async () => {
      const cart = await cartManager.getCart();
      const existing = cart?.discountCodes?.[0]?.discountCode?.id;
      if (existing) setAppliedCode(existing);
    };
    checkApplied();
  }, []);

  const handleApply = async () => {
    if (!code.trim()) return;
    setLoading(true);
    try {
      const updatedCart = await cartManager.applyPromoCode(code.trim());
      if (updatedCart) {
        setAppliedCode(code.trim().toUpperCase());
        setIsValid(true);
        showToast('Promo code applied successfully', StatusType.success);
        await cartContext?.refreshCart?.();
        await onChange?.();
      } else {
        setIsValid(false);
        showToast('Invalid or expired promo code', StatusType.error);
      }
    } catch (error) {
      setIsValid(false);
      showToast('Failed to apply promo code', StatusType.error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      const updatedCart = await cartManager.removePromoCode(appliedCode || '');
      if (updatedCart) {
        showToast('Promo code removed', StatusType.success);
        setAppliedCode(null);
        setCode('');
        setIsValid(null);
        await cartContext?.refreshCart?.();
        await onChange?.();
      }
    } catch {
      showToast('Failed to remove promo code', StatusType.error);
    }
  };

  return (
    <div className="mt-4 bg-cream p-4 rounded-lg shadow-sm border border-whiteCoffee">
      <h3 className="text-lg font-medium text-Temptress mb-3">Promo Code</h3>

      {appliedCode ? (
        <div className="flex items-center justify-between bg-green-50/50 p-3 rounded border border-green-200">
          <div className="flex items-center text-green-800 font-medium">
            ✅ Code applied: <span className="ml-1">{appliedCode}</span>
          </div>
          <button onClick={handleRemove} className="text-sm text-rustBrown hover:text-LightTaupe transition">
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter promo code"
              className={`min-w-0 w-full px-4 py-2 rounded-md border ${
                isValid === false ? 'border-red-300' : 'border-whiteCoffee'
              } focus:outline-none focus:ring-1 focus:ring-LightTaupe`}
            />
            <button
              onClick={handleApply}
              disabled={!code.trim() || loading}
              className="bg-LightTaupe text-creamLight px-4 py-2 rounded-md hover:bg-rustBrown transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Applying...' : 'Apply'}
            </button>
          </div>
          {isValid === false && <p className="mt-2 text-sm text-red-600">Invalid or expired promo code</p>}
        </>
      )}
    </div>
  );
};

export default PromoCode;
