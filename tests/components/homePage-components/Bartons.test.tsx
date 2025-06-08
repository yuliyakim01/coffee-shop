import React from 'react';
import { render, screen } from '@testing-library/react';
import Bartons from '@/components/homePage-components/Bartons';
import '@testing-library/jest-dom';

jest.mock('@/assets/coffee-bg.png', () => 'coffee-bg.png');

describe('Bartons component', () => {
  it('renders heading, paragraph, and link', () => {
    render(<Bartons />);

    expect(screen.getByText(/welcome to bartons incredibly/i)).toBeInTheDocument();

    expect(screen.getByText(/your best local coffee. in addition to delicious sandwiches/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /view more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/products');
  });
});
