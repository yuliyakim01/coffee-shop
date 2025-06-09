import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Breadcrumb from '@/components/Product-components/Breadcrumb';
import { categoryService } from '@/api/category/CategoryService';
import { BrowserRouter } from 'react-router-dom';

jest.mock('@/api/category/CategoryService', () => ({
  getCategories: jest.fn(),
}));

const mockCategories = [
  { id: '1', key: 'coffee', name: { 'en-US': 'Coffee' }, parent: null },
  { id: '2', key: 'espresso', name: { 'en-US': 'Espresso' }, parent: { id: '1' } },
];

describe('Breadcrumb Component', () => {
  test('renders Home and Products links', () => {
    render(
      <BrowserRouter>
        <Breadcrumb />
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  test('renders product name in breadcrumb', () => {
    render(
      <BrowserRouter>
        <Breadcrumb productName="Arabica Beans" />
      </BrowserRouter>
    );

    expect(screen.getByText('Arabica Beans')).toBeInTheDocument();
  });
});
