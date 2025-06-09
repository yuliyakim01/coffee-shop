import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageHero from '@/components/homePage-components/HomePageHero';
import '@testing-library/jest-dom';

jest.mock('@/assets/home-hero.png', () => 'mocked-hero-image.png');

describe('HomePageHero component', () => {
  it('renders the headline, description, and CTA link', () => {
    render(<HomePageHero />);

    // Check heading
    expect(screen.getByRole('heading', { name: /fresh coffee in the morning/i })).toBeInTheDocument();

    // Check paragraph
    expect(screen.getByText(/start your day right with the aroma of freshly brewed coffee/i)).toBeInTheDocument();

    // Check CTA link
    const link = screen.getByRole('link', { name: /order now/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/products');
  });

  it('applies the background image via inline style', () => {
    const { container } = render(<HomePageHero />);
    const heroDiv = container.firstChild as HTMLElement;

    expect(heroDiv).toHaveStyle(`background-image: url(mocked-hero-image.png)`);
  });
});
