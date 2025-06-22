import React from 'react';
import { render, screen } from '@testing-library/react';
import Bartons from '@/components/homePage-components/Bartons';

jest.mock('@/assets/coffee-bg.png', () => 'mocked-coffee-bg');

describe('Bartons component', () => {
  it('renders the heading and text content', () => {
    render(<Bartons />);

    expect(screen.getByRole('heading', { name: /welcome to react coffee/i })).toBeInTheDocument();

    expect(screen.getByText(/your best local coffee/i)).toBeInTheDocument();
  });

  it('renders a link to the products page', () => {
    render(<Bartons />);

    const link = screen.getByRole('link', { name: /view more/i });
    expect(link).toHaveAttribute('href', '/products');
  });
});
