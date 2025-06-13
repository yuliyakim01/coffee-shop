import { AuthData as AUTH } from '@/api/token/authData';
import type { AnonymousAuthMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { ClientBuilder, type Client, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

//TODO:manually handle anonymous tokens...
//setAnonymous token to cart to avoid 403 error anonymous id in use...
const authMiddlewareOptions = (): AnonymousAuthMiddlewareOptions => ({
  host: AUTH.authUrl,
  projectKey: AUTH.projectKey,
  credentials: {
    clientId: AUTH.clientId,
    clientSecret: AUTH.clientSecret,
  },
  scopes: [AUTH.scopes],
  fetch,
});

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: AUTH.baseUrl,
  fetch,
};

const ctpClient = (): Client => {
  return new ClientBuilder()
    .withAnonymousSessionFlow(authMiddlewareOptions())
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();
};

export const getApiRootMyCart = () =>
  createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: AUTH.projectKey });
