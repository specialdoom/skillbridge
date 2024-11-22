import { Hono } from "hono";
import { hc } from "hono/client";
import { config } from "./common/config";
import { container } from "tsyringe";
import { AuthenticationController } from "./controllers/authentication.controller";
import { validateAuthSession, verifyOrigin } from "./middlewares/auth.middleware";
import { EventsController } from "./controllers/events.controller";
import { OrganizationsController } from "./controllers/organizations.controller";
import { RegistrationsController } from "./controllers/registrations.controller";
import { UsersController } from "./controllers/users.controller";

/* -------------------------------------------------------------------------- */
/*                                     App                                    */
/* -------------------------------------------------------------------------- */
export const app = new Hono().basePath("/api");

/* -------------------------------------------------------------------------- */
/*                             Global Middlewares                             */
/* -------------------------------------------------------------------------- */
app.use(verifyOrigin).use(validateAuthSession);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
const routes = app
	.get("/healthcheck", (c) => c.text("Api working ✅!"))
	.route("/auth", container.resolve(AuthenticationController).routes())
	.route("/events", container.resolve(EventsController).routes())
	.route("/organizations", container.resolve(OrganizationsController).routes())
	.route("/registrations", container.resolve(RegistrationsController).routes())
	.route("/users", container.resolve(UsersController).routes());

/* -------------------------------------------------------------------------- */
/*                                   Exports                                  */
/* -------------------------------------------------------------------------- */
const rpc = hc<typeof routes>(config.api.origin);
export type ApiClient = typeof rpc;
export type ApiRoutes = typeof routes;
