import { simplifySingleProduct, simplifyProducts } from '@/utils/productUtils';

import type { ProductProjection, ProductProjectionPagedQueryResponse, Category } from '@commercetools/platform-sdk';

describe('Product simplification utils', () => {
  const mockCategory: Category = {
    id: 'cat1',
    version: 1,
    createdAt: new Date().toISOString(),
    lastModifiedAt: new Date().toISOString(),
    ancestors: [],
    orderHint: '0.1',
    name: { 'en-US': 'Coffee' },
    slug: { 'en-US': 'coffee' },
  };

  const categoryMap = new Map<string, Category>([['cat1', mockCategory]]);

  const mockProductProjection: ProductProjection = {
    id: 'prod1',
    masterVariant: {
      sku: 'sku1',
      key: 'key1',
      images: [{ url: 'http://image1.jpg' }, { url: 'http://image2.jpg' }],
      attributes: [
        { name: 'name', value: 'Coffee Deluxe' },
        { name: 'price', value: 15.5 },
        { name: 'description', value: 'Rich and smooth coffee.' },
        { name: 'type', value: 'Beverage' },
        { name: 'ingredients', value: ['coffee beans', 'water'] },
        { name: 'is_sale', value: true },
        { name: 'sale_percent', value: 10 },
      ],
    },
    categories: [{ id: 'cat1' }],
  };

  const mockPagedResponse: ProductProjectionPagedQueryResponse = {
    results: [mockProductProjection, mockProductProjection],
    limit: 2,
    offset: 0,
    count: 2,
    total: 2,
  };

  test('simplifySingleProduct returns correct simplified product', () => {
    const simplified = simplifySingleProduct(mockProductProjection, categoryMap);

    expect(simplified).toEqual({
      id: 'prod1',
      name: 'Coffee Deluxe',
      price: 15.5,
      description: 'Rich and smooth coffee.',
      type: 'Beverage',
      ingredients: ['coffee beans', 'water'],
      is_sale: true,
      sale_percent: 10,
      images: ['http://image1.jpg', 'http://image2.jpg'],
      category: {
        key: 'coffee',
        name: { 'en-US': 'Coffee' },
      },
      sku: 'sku1',
      key: 'key1',
    });
  });

  test('simplifyProducts returns array of simplified products', () => {
    const simplifiedArr = simplifyProducts(mockPagedResponse, categoryMap);

    expect(simplifiedArr).toHaveLength(2);
    simplifiedArr.forEach((product) => {
      expect(product).toHaveProperty('id', 'prod1');
      expect(product.name).toBe('Coffee Deluxe');
    });
  });
});
