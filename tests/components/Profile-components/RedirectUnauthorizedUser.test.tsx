import React from 'react';
import { act, render, screen } from '@testing-library/react';
import RedirectUnauthorizedUser from '@/components/Profile-components/RedirectUnauthorizedUser';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import { useNavigate } from 'react-router-dom';

jest.mock('@/utils/customerUtils', () => ({
  getLoggedInUserFromSessionStorage: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('RedirectUnauthorizedUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('shows popup and redirects if no user is found in session storage', () => {
    (getLoggedInUserFromSessionStorage as jest.Mock).mockReturnValue(null);

    render(<RedirectUnauthorizedUser />);

    // InfoPopup is shown
    expect(screen.getByText(/you must log in/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('renders nothing if user exists in session storage', () => {
    (getLoggedInUserFromSessionStorage as jest.Mock).mockReturnValue({
      customerId: '123',
      customerVersion: '1',
    });

    render(<RedirectUnauthorizedUser />);

    expect(screen.queryByText(/you must log in/i)).not.toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
