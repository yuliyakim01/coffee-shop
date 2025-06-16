import React, { useState, useEffect } from 'react';
import { getPromoCodes } from '@/api/promocodes';
import type { DiscountCodePagedQueryResponse } from '@commercetools/platform-sdk';
import type { PromoCode } from '@/data/interfaces';

function RunningPromoCodes() {
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
    <div className="absolute top-0 w-full bg-[rgba(34,27,24,0.60)] py-3 px-4 z-50 overflow-hidden">
      <div className="whitespace-nowrap inline-block text-[#e6d7c2] font-semibold text-lg animate-marquee">
        {codes.map((code, index) => (
          <span key={index} className="mx-8 inline-block">
            <span className="text-[#B77E66]">{code.name}</span>: {code.description}
          </span>
        ))}
      </div>

      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            animation: marquee 18s linear infinite;
          }
        `}
      </style>
    </div>
  );
}

export default RunningPromoCodes;
