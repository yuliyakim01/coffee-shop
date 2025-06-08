import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '@/pages/Profile'; // Adjust path if needed

jest.mock('@/components/Profile-components/ProfileComponent', () => () => (
  <div data-testid="profile-component">Mocked ProfileComponent</div>
));

jest.mock('@/components/Profile-components/RedirectUnauthorizedUser', () => () => (
  <div data-testid="redirect-unauthorized-user">Mocked RedirectUnauthorizedUser</div>
));

describe('Profile page', () => {
  it('renders RedirectUnauthorizedUser and ProfileComponent', () => {
    render(<Profile />);

    expect(screen.getByTestId('redirect-unauthorized-user')).toBeInTheDocument();
    expect(screen.getByTestId('profile-component')).toBeInTheDocument();
  });
});
