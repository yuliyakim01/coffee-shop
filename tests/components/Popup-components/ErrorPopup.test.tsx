import { render, screen } from '@testing-library/react';
import ErrorPopup from '@/components/Popup-components/ErrorPopup';
import BasePopup from '@/components/Popup-components/Popup';

jest.mock('@/components/Popup-components/Popup', () =>
  jest.fn(({ message, icon, className, positionClassName, closeButtonClassName }) => (
    <div>
      <span>{icon}</span>
      <span>{message}</span>
      <button className={closeButtonClassName}>Close</button>
      <div className={positionClassName} />
      <div className={className} />
    </div>
  ))
);

describe('ErrorPopup Component', () => {
  const defaultProps = {
    message: 'An error occurred',
    onClose: jest.fn(),
    autoDismissMs: 3000,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ErrorPopup with correct props', () => {
    render(<ErrorPopup {...defaultProps} />);

    expect(screen.getByText('⚠️')).toBeInTheDocument();
    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(BasePopup).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'An error occurred',
        icon: '⚠️',
        autoDismissMs: 3000,
        className: 'bg-red-100 text-red-700 border border-red-300',
        positionClassName: 'inset-0 flex items-center justify-center',
        closeButtonClassName: 'text-red-500 hover:text-red-700',
      }),
      expect.anything()
    );
  });

  test('passes onClose function to BasePopup', () => {
    render(<ErrorPopup {...defaultProps} />);

    expect(BasePopup).toHaveBeenCalledWith(
      expect.objectContaining({
        onClose: defaultProps.onClose,
      }),
      expect.anything()
    );
  });

  test('renders with different message and autoDismissMs', () => {
    const customProps = {
      ...defaultProps,
      message: 'Custom error',
      autoDismissMs: 5000,
    };
    render(<ErrorPopup {...customProps} />);

    expect(screen.getByText('Custom error')).toBeInTheDocument();
    expect(BasePopup).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Custom error',
        autoDismissMs: 5000,
      }),
      expect.anything()
    );
  });

  test('applies correct classes to BasePopup', () => {
    render(<ErrorPopup {...defaultProps} />);

    expect(screen.getByText('An error occurred').parentElement).toHaveClass('bg-red-100');
    expect(screen.getByText('An error occurred').parentElement).toHaveClass('text-red-700');
    expect(screen.getByText('An error occurred').parentElement).toHaveClass('border');
    expect(screen.getByText('An error occurred').parentElement).toHaveClass('border-red-300');
    expect(screen.getByText('Close')).toHaveClass('text-red-500');
    expect(screen.getByText('Close')).toHaveClass('hover:text-red-700');
    expect(screen.getByText('inset-0 flex items-center justify-center')).toBeInTheDocument();
  });
});
