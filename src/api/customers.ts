import type { ApiRoot, ClientResponse, CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/api/commerceToolsClient';
import { AuthData as AUTH } from '@/api/token/authData';

const apiRoot: ApiRoot = createApiBuilderFromCtpClient(ctpClient);

export async function registerCustomer(customerDraft: CustomerDraft): Promise<CustomerSignInResult> {
  try {
    const response: ClientResponse<CustomerSignInResult> = await apiRoot
      .withProjectKey({ projectKey: AUTH.projectKey })
      .customers()
      .post({ body: customerDraft })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
}

export const loginCustomer: (email: string, password: string) => Promise<CustomerSignInResult> = async (
  email: string,
  password: string
): Promise<CustomerSignInResult> => {
  try {
    const response: ClientResponse<CustomerSignInResult> = await apiRoot
      .withProjectKey({ projectKey: AUTH.projectKey })
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
