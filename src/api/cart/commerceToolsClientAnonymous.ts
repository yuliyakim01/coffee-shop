import { AuthData as AUTH } from '@/api/token/authData';
import type { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ClientBuilder, type Client, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ByProjectKeyMeCartsRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const authMiddlewareOptions = (): AnonymousAuthMiddlewareOptions => ({
  host: AUTH.authUrl,
  projectKey: AUTH.projectKey,
  credentials: {
    clientId: AUTH.clientId,
    clientSecret: AUTH.clientSecret,
  },
  scopes: [`manage_project:${AUTH.projectKey}`],
  fetch,
});

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: AUTH.baseUrl,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withAnonymousSessionFlow(authMiddlewareOptions())
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRootMyCart = () => {
  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: AUTH.projectKey }).me().carts();
};
