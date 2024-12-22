import "reflect-metadata";
import { hc } from "hono/client";
import { redirect, type Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import type { ApiRoutes } from "$lib/server/api";
import { parseApiResponse } from "$lib/utils/api";
import { StatusCodes } from "$lib/constants/status-codes";
import { isApiRoute, isAppRoute, isAuthRoute } from "$lib/server/api/common/utils/route";

const apiClient: Handle = async ({ event, resolve }) => {
	/* ------------------------------ Register api ------------------------------ */
	const { api } = hc<ApiRoutes>("/", {
		fetch: event.fetch,
		headers: {
			"x-forwarded-for": event.getClientAddress(),
			host: event.request.headers.get("host") || ""
		}
	});

	/* ------------------------------ Set contexts ------------------------------ */
	event.locals.api = api;
	event.locals.parseApiResponse = parseApiResponse;

	/* ----------------------------- Return response ---------------------------- */
	return await resolve(event);
};

const session: Handle = async ({ event, resolve }) => {
	if (isApiRoute(event.route.id) || isAppRoute(event.route.id)) {
		const { data } = await event.locals.api.auth.verify.$post().then(parseApiResponse);

		if (!data?.success) {
			throw redirect(StatusCodes.TEMPORARY_REDIRECT, "/login");
		}

		return await resolve(event);
	}

	return await resolve(event);
};

export const handle = sequence(apiClient);
