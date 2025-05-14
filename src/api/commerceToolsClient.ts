import { AuthData as AUTH } from '@/api/token/authData';
import { ClientBuilder, type AuthMiddlewareOptions, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2';

const fetchApi = fetch;

const projectKey: string = AUTH.projectKey;

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH.authUrl,
  projectKey,
  credentials: {
    clientId: AUTH.clientId,
    clientSecret: AUTH.clientSecret,
  },
  scopes: [AUTH.scopes],
  fetch: fetchApi,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: AUTH.baseUrl,
  fetch: fetchApi,
};

export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();
