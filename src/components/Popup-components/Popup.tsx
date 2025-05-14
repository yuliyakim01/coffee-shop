import React, { useEffect, useState } from 'react';
export type BasePopupProps = {
  message: string;
  onClose?: () => void;
  autoDismissMs?: number;
  icon?: React.ReactNode;
  className?: string;
  positionClassName?: string;
  closeButtonClassName?: string;
};

const BasePopup: React.FC<BasePopupProps> = ({
  message,
  onClose,
  autoDismissMs = 3000,
  icon,
  className = '',
  positionClassName = '',
  closeButtonClassName = '',
}: BasePopupProps) => {
  const [visible, setVisible] = useState(true);

  useEffect((): (() => void) => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => setVisible(false), autoDismissMs);
    return (): void => clearTimeout(timer);
  }, [autoDismissMs]);

  useEffect((): (() => void) => {
    const close: () => void = (): void => setVisible(false);
    const handleClick: () => void = (): void => close();
    const handleKeyPress: () => void = (): void => close();

    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyPress);

    return (): void => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  useEffect((): (() => void) | undefined => {
    if (!visible) {
      const timer: ReturnType<typeof setTimeout> = setTimeout((): void => {
        onClose?.();
      }, 300);
      return (): void => clearTimeout(timer);
    }
  }, [visible, onClose]);

  return (
    <div className={`fixed z-50 ${positionClassName}`}>
      <div
        className={`flex items-start rounded shadow-lg transition-opacity duration-300 p-4 ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      >
        {icon && <div className="mr-2 text-xl">{icon}</div>}
        <div className="text-sm">{message}</div>
        {onClose && (
          <button
            onClick={(): void => setVisible(false)}
            className={`ml-4 text-lg font-bold focus:outline-none ${closeButtonClassName}`}
            aria-label="Close popup"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default BasePopup;
