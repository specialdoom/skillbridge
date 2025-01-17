import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";
import { verifyRequestOrigin } from "lucia";
import type { HonoTypes } from "../common/types/hono";
import { container } from "tsyringe";
import { LuciaService } from "../services/lucia.service";

// resolve dependencies from the container
const { lucia } = container.resolve(LuciaService);

// Middleware to verify the origin of the request
export const verifyOrigin: MiddlewareHandler<HonoTypes> = createMiddleware(async (c, next) => {
	if (c.req.method === "GET") {
		return next();
	}
	const originHeader = c.req.header("Origin") ?? null;
	const hostHeader = c.req.header("Host") ?? null;
	if (!originHeader || !hostHeader || !verifyRequestOrigin(originHeader, [hostHeader])) {
		return c.body(null, 403);
	}
	return next();
});

export const validateAuthSession: MiddlewareHandler<HonoTypes> = createMiddleware(
	async (c, next) => {
		const sessionId = lucia.readSessionCookie(c.req.header("Cookie") ?? "");

		if (!sessionId) {
			c.set("user", null);
			c.set("session", null);
			return next();
		}

		const { session, user } = await lucia.validateSession(sessionId);

		if (session && session.fresh) {
			c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), { append: true });
		}
		if (!session) {
			c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), { append: true });
		}
		c.set("session", session);
		c.set("user", user);
		return next();
	}
);
