import { getApiRoot } from '@/utils/getApiRoot';
import type { Cart, CartDraft, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';
import { ByProjectKeyMeCartsRequestBuilder, LineItemDraft, Product } from '@commercetools/platform-sdk';
import { CartUpdateActions } from '@/data/constants';
import { getApiRootMyCart } from '@/api/cart/commerceToolsClientAnonymous';
import { getOrCreateAnonymousId } from '@/utils/cartUtils';

const cartEndpoint = getApiRootMyCart().me().carts();

export const getAnonymousCart = async (): Promise<Cart | null> => {
  try {
    const response = await cartEndpoint.get().execute();
    return response.body.results.length > 0 ? response.body.results[0] : null;
  } catch (error) {
    console.error('Error fetching anonymous cart:', error);
    return null;
  }
};
export const createNewAnonymousCart = async (): Promise<Cart> => {
  try {
    const response = await cartEndpoint
      .post({
        body: {
          currency: 'USD',
        },
      })
      .execute();

    return response.body;
  } catch (error) {
    console.error('Failed to create new anonymous cart:', error);
    throw error;
  }
};

export const createCart = async (cartDraft: CartDraft) => {
  try {
    const response: ClientResponse<Cart> = await cartEndpoint.post({ body: cartDraft }).execute();
    return response.body;
  } catch (error) {
    console.error('Failed to create a new cart:', error);
    throw error;
  }
};

export const updateCart = async (cart: Cart, body: MyCartUpdate) => {
  try {
    const response: ClientResponse<Cart> = await cartEndpoint.withId({ ID: cart.id }).post({ body }).execute();
    return response.body;
  } catch (error) {
    console.error('Failed to update cart:', error);
    throw error;
  }
};
export const fetchOrCreateCart = async () => {
  const anonymousId = getOrCreateAnonymousId();

  const carts = await cartEndpoint.get({ queryArgs: { where: `anonymousId="${anonymousId}"` } }).execute();
  const existingCart = carts.body.results[0];

  if (existingCart) return existingCart;

  const newCart = await cartEndpoint
    .post({
      body: {
        currency: 'USD',
        anonymousId,
      },
    })
    .execute();

  return newCart.body;
};

/*
{
  "action": "addDiscountCode",
  "code": "mydiscountcode"
}
{
  "action": "addPayment",
  "payment": {
    "id": "{{payment-id}}",
    "typeId": "payment"
  }
}

{
  "action": "removeDiscountCode",
  "discountCode": {
    "typeId": "discount-code",
    "id": "{{discount-code-id}}"
  }
}
{
  "action": "removePayment",
  "payment": {
    "id": "{{payment-id}}",
    "typeId": "payment"
  }
}
{
  "type": "Cart",
  "id": "ae4a3c7f-02d3-4d36-9ecb-2e7bea361636",
  "version": 1,
  "versionModifiedAt": "2025-06-09T19:22:20.070Z",
  "lastMessageSequenceNumber": 1,
  "createdAt": "2025-06-09T19:22:20.070Z",
  "lastModifiedAt": "2025-06-09T19:22:20.070Z",
  "lastModifiedBy": {
    "isPlatformClient": true,
    "user": {
      "typeId": "user",
      "id": "31bf6869-7160-4f4c-bce6-f341165948e9"
    }
  },
  "createdBy": {
    "isPlatformClient": true,
    "user": {
      "typeId": "user",
      "id": "31bf6869-7160-4f4c-bce6-f341165948e9"
    }
  },
  "lineItems": [],
  "cartState": "Active",
  "totalPrice": {
    "type": "centPrecision",
    "currencyCode": "USD",
    "centAmount": 0,
    "fractionDigits": 2
  },
  "shippingMode": "Single",
  "shipping": [],
  "customLineItems": [],
  "discountCodes": [],
  "directDiscounts": [],
  "inventoryMode": "None",
  "taxMode": "Platform",
  "taxRoundingMode": "HalfEven",
  "taxCalculationMode": "LineItemLevel",
  "deleteDaysAfterLastModification": 90,
  "refusedGifts": [],
  "origin": "Customer",
  "itemShippingAddresses": [],
  "discountTypeCombination": {
    "type": "Stacking"
  }
}


 */
