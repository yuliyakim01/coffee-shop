/*
this code is for future use:

import { createClient } from '@commercetools/sdk-client';

import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { AuthData as AUTH } from '@/api/token/auth-data.js';

const projectKey = 'awesome-coffee-shop';

const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
  host: AUTH.authUrl,
  projectKey,
  credentials: {
    clientId: AUTH.clientId,
    clientSecret: AUTH.clientSecret,
  },
  scopes: [AUTH.scopes],
});
const httpMiddleware = createHttpMiddleware({
  host: AUTH.baseUrl,
});
const client = createClient({
  middlewares: [authMiddleware, httpMiddleware],
});
 */
