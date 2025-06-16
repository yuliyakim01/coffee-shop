import React, { useEffect } from 'react';

interface ClearCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ClearCartModal: React.FC<ClearCartModalProps> = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Clear Your Shopping Cart?</h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to remove all items from your cart? This action cannot be undone.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClearCartModal;
