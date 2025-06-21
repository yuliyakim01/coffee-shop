import { renderHook, act } from '@testing-library/react';
import { useProducts } from '@/api/product/useProduct';
import { productService } from '@/api/product/ProductService';
import { subscriptionManager } from '@/api/product/SubscriptionManager';
import type { ProductInteface } from '@/data/interfaces';

jest.mock('@/api/product/ProductService');
jest.mock('../../../src/api/product/SubscriptionManager');

const mockProducts: ProductInteface[] = [
  {
    id: '1',
    name: 'Coffee A',
    price: 10,
    description: 'test',
    type: 'test',
    ingredients: ['test'],
    is_sale: true,
    sale_percent: 5,
    images: ['test'],
    category: null,
    sku: 'test',
    key: 'test',
    variantId: 1,
    discountedPrice: 1.0,
  },
  {
    id: '2',
    name: 'Coffee B',
    price: 15,
    description: 'test',
    type: 'test',
    ingredients: ['test'],
    is_sale: true,
    sale_percent: 5,
    images: ['test'],
    category: null,
    sku: 'test',
    key: 'test',
    variantId: 1,
    discountedPrice: 1.0,
  },
];

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (productService.getTotalCount as jest.Mock).mockReturnValue(2);
    (productService.getProducts as jest.Mock).mockReturnValue(mockProducts);
    (productService.loadProducts as jest.Mock).mockImplementation(() => {});
    (productService.setSearchTerm as jest.Mock).mockImplementation(() => {});
    (productService.setFilter as jest.Mock).mockImplementation(() => {});
    (productService.setSort as jest.Mock).mockImplementation(() => {});
    (productService.setPagination as jest.Mock).mockImplementation(() => {});
  });

  it('initializes with loading=true and updates after subscription callback', () => {
    const subscribers = new Set<() => void>();
    (subscriptionManager.subscribe as jest.Mock).mockImplementation((cb) => subscribers.add(cb));
    (subscriptionManager.unsubscribe as jest.Mock).mockImplementation((cb) => subscribers.delete(cb));

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    act(() => {
      subscribers.forEach((cb) => cb());
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.total).toBe(2);
  });

  it('returns correct setter functions', () => {
    const { result } = renderHook(() => useProducts());

    expect(typeof result.current.setSearchTerm).toBe('function');
    expect(typeof result.current.setFilter).toBe('function');
    expect(typeof result.current.setSort).toBe('function');
    expect(typeof result.current.setPagination).toBe('function');
  });

  it('cleans up subscription on unmount', () => {
    const unsubscribe = jest.fn();
    const callback = jest.fn();

    (subscriptionManager.subscribe as jest.Mock).mockImplementation((cb) => {
      callback.mockImplementation(cb);
    });
    (subscriptionManager.unsubscribe as jest.Mock).mockImplementation(unsubscribe);

    const { unmount } = renderHook(() => useProducts());
    unmount();

    expect(subscriptionManager.unsubscribe).toHaveBeenCalled();
  });
});
