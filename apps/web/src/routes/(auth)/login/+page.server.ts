import { StatusCodes } from "$lib/constants/status-codes";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	async default({ request, locals }) {
		const formData = await request.formData();
		const email = formData.get("email")?.toString();
		const password = formData.get("password")?.toString();

		if (!email || !password) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Email and password are required"
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
				error: "Something went wrong"
			});
		}

		return redirect(StatusCodes.SEE_OTHER, "/");
	}
};
