import { ctpClient } from './commerceToolsClient';
import type { ApiRoot, ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot: ApiRoot = createApiBuilderFromCtpClient(ctpClient);

export const fetchAllProducts: () => Promise<ProductPagedQueryResponse> =
  async (): Promise<ProductPagedQueryResponse> => {
    try {
      const response: ClientResponse<ProductPagedQueryResponse> = await apiRoot
        .withProjectKey({ projectKey: 'awesome-coffee-shop' })
        .products()
        .get()
        .execute();

      return response.body;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  };
