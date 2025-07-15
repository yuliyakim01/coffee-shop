import React, { useEffect, useState } from 'react';
import { getPromoCodes } from '@/api/promocodes';
import type { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import type { PromoCode } from '@/data/interfaces';

const PromoCodeList: React.FC = () => {
  const [codes, setCodes] = useState<PromoCode[]>([]);

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const promoCodes: DiscountCodePagedQueryResponse = await getPromoCodes();
        const extractedPromoCodes = promoCodes.results.map((code) => ({
          name: code.name?.['en-US'] || 'Unnamed Code',
          description: code.description?.['en-US'] || 'No description available',
        }));

        setCodes(extractedPromoCodes);
      } catch (error) {
        console.error('Error fetching promo codes:', error);
      }
    };

    fetchPromoCodes();
  }, []);

  return (
    <div className="relative -top-[110px] w-full z-10 px-6 py-10 bg-coffeeBrown  shadow-lg   border border-whiteCoffee">
      <h2 className="text-3xl font-bold text-cream mb-8 border-b border-whiteCoffee pb-3">
        🎁 Discover Exclusive Promo Codes
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {codes.map((code, index) => (
          <div
            key={index}
            className="bg-creamLight rounded-xl p-5 shadow-inner border border-rustBrown hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-xl font-semibold text-Temptress mb-2 tracking-wide">{code.name}</h3>
            <p className="text-sm text-brown leading-relaxed">{code.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoCodeList;
