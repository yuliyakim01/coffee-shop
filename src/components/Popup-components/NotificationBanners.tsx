import ErrorPopup from './ErrorPopup';
import SuccessPopup from './SuccessPopup';
import type { ReactElement } from 'react';
import React from 'react';
interface NotificationBannersProps {
  errorMessage: string | null;
  onClearError: () => void;
  successMessage: string | null;
  onClearSuccess: () => void;
  autoDismissMs?: number;
}

const NotificationBanners: ({
  errorMessage,
  onClearError,
  successMessage,
  onClearSuccess,
  autoDismissMs,
}: NotificationBannersProps) => React.ReactElement = ({
  errorMessage,
  onClearError,
  successMessage,
  onClearSuccess,
  autoDismissMs = 5000,
}: NotificationBannersProps): ReactElement => {
  return (
    <>
      {errorMessage && <ErrorPopup message={errorMessage} onClose={onClearError} autoDismissMs={autoDismissMs} />}
      {successMessage && <SuccessPopup message={successMessage} onClose={onClearSuccess} />}
    </>
  );
};

export default NotificationBanners;
