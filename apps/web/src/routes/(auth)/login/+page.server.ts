import { StatusCodes } from '$lib/constants/status-codes';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	async default({ request, locals, cookies }) {
		const formData = await request.formData();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();

		if (!email || !password) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: 'Email and password are required'
			});
		}

		const { error, data } = await locals.api.auth.login
			.$post({
				json: {
					email,
					password
				}
			})
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}

		if (!data) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: 'Something went wrong'
			});
		}

		cookies.set('session_id', data.sessionCookie.value, { path: '/' });

		return redirect(StatusCodes.PERMANENT_REDIRECT, '/');
	}
};
