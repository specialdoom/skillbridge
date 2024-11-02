import 'reflect-metadata';
import { hc } from 'hono/client';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { ApiRoutes } from '$lib/server/api';
import { parseApiResponse } from '$lib/utils/api';
import { StatusCodes } from '$lib/constants/status-codes';
import { isApiRoute, isAuthRoute } from '$lib/server/api/common/utils/route';

const apiClient: Handle = async ({ event, resolve }) => {
	/* ------------------------------ Register api ------------------------------ */
	const { api } = hc<ApiRoutes>('/', {
		fetch: event.fetch,
		headers: {
			'x-forwarded-for': event.getClientAddress(),
			host: event.request.headers.get('host') || ''
		}
	});

	/* ----------------------------- Auth functions ----------------------------- */
	async function getAuthedUser() {
		const { data } = await api.auth.me.$get().then(parseApiResponse);
		return data && data.user;
	}

	async function getAuthedUserOrThrow(redirectTo = '/') {
		const { data } = await api.auth.me.$get().then(parseApiResponse);
		if (!data || !data.user) throw redirect(StatusCodes.TEMPORARY_REDIRECT, redirectTo);
		return data?.user;
	}

	/* ------------------------------ Set contexts ------------------------------ */
	event.locals.api = api;
	event.locals.parseApiResponse = parseApiResponse;
	event.locals.getAuthedUser = getAuthedUser;
	event.locals.getAuthedUserOrThrow = getAuthedUserOrThrow;

	/* ----------------------------- Return response ---------------------------- */
	const response = await resolve(event);
	return response;
};

const session: Handle = async ({ event, resolve }) => {
	console.log('session hook');

	// Skip api and auth routes
	if (isApiRoute(event.route.id) || isAuthRoute(event.route.id)) {
		const response = await resolve(event);
		return response;
	}

	const session = event.cookies.get('session_id');

	console.log('user', session, event.route.id);

	if (!session) {
		throw redirect(StatusCodes.TEMPORARY_REDIRECT, '/login');
	}

	const response = await resolve(event);
	return response;
};

export const handle = sequence(apiClient, session);
