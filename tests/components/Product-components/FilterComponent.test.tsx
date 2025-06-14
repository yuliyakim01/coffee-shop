import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FilterComponent from '@/components/Product-components/FilterComponent';

jest.mock('@/api/category/CategoryService', () => ({
  getSubcategoriesByParentKey: jest.fn(),
}));

describe('FilterComponent', () => {
  test('renders filter dropdowns and reset button', () => {
    render(<FilterComponent onFilterChange={jest.fn()} />);

    expect(screen.getByText('All Sales')).toBeInTheDocument();
    expect(screen.getByText('All Categories')).toBeInTheDocument();
    expect(screen.getByText('All Prices')).toBeInTheDocument();
    expect(screen.getByText('Reset Filters')).toBeInTheDocument();
  });

  test('resets filters correctly when clicking reset button', () => {
    const onFilterChangeMock = jest.fn();
    render(<FilterComponent onFilterChange={onFilterChangeMock} />);

    fireEvent.click(screen.getByText('Reset Filters'));

    expect(onFilterChangeMock).toHaveBeenCalledWith({
      isSale: undefined,
      category: undefined,
      priceMin: undefined,
      priceMax: undefined,
    });
  });
});
