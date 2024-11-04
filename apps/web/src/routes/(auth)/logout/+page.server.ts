import { StatusCodes } from '$lib/constants/status-codes.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, cookies }) => {
	await locals.api.auth.logout.$post().then(locals.parseApiResponse);

	cookies.delete('session_id', { path: '/' });

	return redirect(StatusCodes.SEE_OTHER, '/login');
};
