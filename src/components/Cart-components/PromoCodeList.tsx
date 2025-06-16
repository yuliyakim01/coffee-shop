import React, { useEffect, useState } from 'react';
import { getPromoCodes } from '@/api/promocodes';
import type { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';

interface PromoCode {
  name: string;
  description: string;
}

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
    <div className="relative z-10">
      <div className="mx-auto border border-gray-900 p-4 rounded-md shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-900 pb-2 mb-4">Use Our Promo Codes</h2>
        <ul className="flex flex-wrap gap-4">
          {codes.map((code, index) => (
            <li key={index} className="border border-gray-900 p-3">
              <h3 className="text-lg font-medium text-gray-900">{code.name}</h3>
              <p className="text-gray-700">{code.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PromoCodeList;
