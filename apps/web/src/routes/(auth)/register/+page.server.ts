import { StatusCodes } from '$lib/constants/status-codes';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		const confirmPassword = formData.get('confirmPassword');

		if (!email || !password) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: 'Email and password are required'
			});
		}

		if (password !== confirmPassword) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: 'Passwords do not match'
			});
		}

		const { error } = await locals.api.auth.register
			.$post({
				json: {
					email,
					password
				}
			})
			.then(locals.parseApiResponse);

		console.log(error);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}

		return redirect(StatusCodes.SEE_OTHER, '/login');
	}
};
