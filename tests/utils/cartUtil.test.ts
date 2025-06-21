import {
  convertToCartProduct,
  createCartDraft,
  createEmptyCartDraft,
  buildLineItemActionAdd,
  buildLineItemActionReduce,
  buildLineItemActionRemove,
  findLineItem,
  getOrCreateAnonymousId,
  resetAnonymousId,
  getCartQuery,
} from '@/utils/cartUtils';

const sampleProductProjection = {
  id: 'p1',
  masterVariant: { id: 42 },
  variants: [],
};

const sampleProductInterface = {
  id: 'p2',
  variantId: 5,
};

const sampleUser = {
  customerId: 'cust123',
} as const;

describe('buildLineItemActionAdd', () => {
  const cartProduct = { id: 'p1', variantId: 1 };

  it('creates addLineItem action when lineItem is null', () => {
    expect(buildLineItemActionAdd(cartProduct, null)).toEqual({
      action: 'addLineItem',
      productId: 'p1',
      variantId: 1,
      quantity: 1,
    });
  });

  it('creates changeLineItemQuantity when lineItem exists', () => {
    expect(buildLineItemActionAdd(cartProduct, { id: 'l1', quantity: 2 } as any)).toEqual({
      action: 'changeLineItemQuantity',
      lineItemId: 'l1',
      quantity: 3,
    });
  });
});

describe('buildLineItemActionReduce', () => {
  const cp = { id: 'p', variantId: 1 };

  it('throws if no lineItem', () => {
    expect(() => buildLineItemActionReduce(cp, null)).toThrow(/does not exist/);
  });

  it('throws if quantity is 1 or less', () => {
    expect(() => buildLineItemActionReduce(cp, { id: 'x', quantity: 1 } as any)).toThrow(/minimum quantity/);
  });

  it('reduces line item quantity', () => {
    expect(buildLineItemActionReduce(cp, { id: 'l2', quantity: 3 } as any)).toEqual({
      action: 'changeLineItemQuantity',
      lineItemId: 'l2',
      quantity: 2,
    });
  });
});

it('buildLineItemActionRemove throws if no ID', () => {
  expect(() => buildLineItemActionRemove('')).toThrow(/does not exist/);
});

it('buildLineItemActionRemove returns correct payload', () => {
  expect(buildLineItemActionRemove('xyz')).toEqual({
    action: 'removeLineItem',
    lineItemId: 'xyz',
  });
});

it('findLineItem returns matched item or null', () => {
  const cart = {
    lineItems: [{ id: 'a', productId: 'p1' }],
  } as any;

  expect(findLineItem('p1', cart)).toEqual(cart.lineItems[0]);
  expect(findLineItem('p2', cart)).toBeNull();
});
