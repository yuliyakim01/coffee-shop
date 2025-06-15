import React, { useState } from 'react';

const PromoCode = () => {
  const [code, setCode] = useState('');
  const [appliedCode, setAppliedCode] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleApply = () => {
    // Simple validation - replace with actual validation logic
    const validCodes = ['DISCOUNT10', 'SAVE20', 'FREESHIP'];
    const isValidCode = validCodes.includes(code.toUpperCase());

    setIsValid(isValidCode);
    if (isValidCode) {
      setAppliedCode(code.toUpperCase());
    }
  };

  const handleRemove = () => {
    setAppliedCode(null);
    setCode('');
    setIsValid(null);
  };

  return (
    <div className="mt-4 bg-cream p-4 rounded-lg shadow-sm border border-whiteCoffee">
      <h3 className="text-lg font-medium text-Temptress mb-3">Promo Code</h3>

      {appliedCode ? (
        <div className="flex items-center justify-between bg-green-50/50 p-3 rounded border border-green-200">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-600 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-green-800 font-medium">Code applied: {appliedCode}</span>
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
              className={`flex-1 px-4 py-2 rounded-md border ${
                isValid === false ? 'border-red-300' : 'border-whiteCoffee'
              } focus:outline-none focus:ring-1 focus:ring-LightTaupe`}
            />
            <button
              onClick={handleApply}
              disabled={!code.trim()}
              className="bg-LightTaupe text-creamLight px-4 py-2 rounded-md hover:bg-rustBrown transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
          {isValid === false && (
            <p className="mt-2 text-sm text-red-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              Invalid promo code
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default PromoCode;
