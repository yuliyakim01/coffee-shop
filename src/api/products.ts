import { ctpClient } from './commerceToolsClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const apiRoot = createApiBuilderFromCtpClient(ctpClient);

export const fetchAllProducts = async () => {
  try {
    const response = await apiRoot.withProjectKey({ projectKey: 'awesome-coffee-shop' }).products().get().execute();

    return response.body;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};
