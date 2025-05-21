import type { ApiRoot, ClientResponse, Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '@/api/commerceToolsClient';
import { AuthData as AUTH } from '@/api/token/authData';
import type { SignInResponse } from '@/data/interfaces';

const apiRoot: ApiRoot = createApiBuilderFromCtpClient(ctpClient);

export async function registerCustomer(customerDraft: CustomerDraft): Promise<SignInResponse> {
  try {
    const response: ClientResponse<SignInResponse> = await apiRoot
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

export const loginCustomer: (email: string, password: string) => Promise<SignInResponse> = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  try {
    const response: ClientResponse<SignInResponse> = await apiRoot
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
export const getCustomerById = async (customerId: string): Promise<Customer> => {
  try {
    const response: ClientResponse<Customer> = await apiRoot
      .withProjectKey({ projectKey: AUTH.projectKey })
      .customers()
      .withId({ ID: customerId })
      .get()
      .execute();
    console.log(response.body);
    return response.body;
  } catch (error) {
    console.error('Failed to fetch a customer:', error);
    throw error;
  }
};
