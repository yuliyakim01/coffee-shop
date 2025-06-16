import { getApiRoot } from '@/utils/getApiRoot';
import type {
  ByProjectKeyDiscountCodesRequestBuilder,
  ClientResponse,
  DiscountCodePagedQueryResponse,
} from '@commercetools/platform-sdk';

const discountsEndpoint: ByProjectKeyDiscountCodesRequestBuilder = getApiRoot().discountCodes();

export const getPromoCodes = async () => {
  try {
    const response: ClientResponse<DiscountCodePagedQueryResponse> = await discountsEndpoint.get().execute();
    return response.body;
  } catch (error) {
    console.error('Error fetching promo codes: ', error);
    throw error;
  }
};
