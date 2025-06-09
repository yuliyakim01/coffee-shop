import React from 'react';
import { render, screen } from '@testing-library/react';
import CommentCard from '@/components/homePage-components/CommentCard';
import '@testing-library/jest-dom';

describe('CommentCard component', () => {
  const mockProps = {
    img: 'https://example.com/avatar.jpg',
    stars: 4,
    userName: 'Jane Doe',
    description: 'This coffee was amazing!',
    coffeeName: 'Espresso Roast',
    date: 'June 2025',
  };

  it('renders user info and content correctly', () => {
    render(<CommentCard {...mockProps} />);

    // Check for user name
    expect(screen.getByText(/jane doe/i)).toBeInTheDocument();

    // Check for description
    expect(screen.getByText(/this coffee was amazing/i)).toBeInTheDocument();

    // Check for coffee name
    expect(screen.getByText(/espresso roast/i)).toBeInTheDocument();

    // Check for date
    expect(screen.getByText(/june 2025/i)).toBeInTheDocument();

    // Check for profile image
    const img = screen.getByAltText(/jane doe's profile/i) as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(mockProps.img);
  });

  it('displays the correct number of filled and empty stars', () => {
    render(<CommentCard {...mockProps} />);

    const filledStars = screen.getAllByText('★').filter((el) => el.classList.contains('text-yellow-400'));
    const emptyStars = screen.getAllByText('★').filter((el) => el.classList.contains('text-gray-300'));

    expect(filledStars).toHaveLength(4);
    expect(emptyStars).toHaveLength(1);
  });
});
