import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '@/components/NotFound-components/SearchBar';
import '@testing-library/jest-dom';

describe('SearchBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    window.alert = jest.fn(); // mock alert
  });

  it('renders input and button', () => {
    render(<SearchBar />);
    expect(screen.getByPlaceholderText(/search our site/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates input value and calls alert with query on button click', () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText(/search our site/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'coffee beans' } });
    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith('Search for: coffee beans');
  });

  it('calls alert with empty string if input is empty', () => {
    render(<SearchBar />);
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith('Search for: ');
  });
});
