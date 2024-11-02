import { Hono } from 'hono';
import { hc } from 'hono/client';
import { config } from './common/config';
import { container } from 'tsyringe';
import { AuthenticationController } from './controllers/authentication.controller';
import { validateAuthSession, verifyOrigin } from './middlewares/auth.middleware';

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */
export const app = new Hono().basePath('/api');

/* -------------------------------------------------------------------------- */
/*                             Global Middlewares                             */
/* -------------------------------------------------------------------------- */
app.use(verifyOrigin).use(validateAuthSession);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
const routes = app
	.get('/healthcheck', (c) => c.text('Api working ✅!'))
	.route('/auth', container.resolve(AuthenticationController).routes());

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
const rpc = hc<typeof routes>(config.api.origin);
export type ApiClient = typeof rpc;
export type ApiRoutes = typeof routes;
