import { StatusCodes } from "$lib/constants/status-codes";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { loginSchema } from "$lib/shared/schemas/login.schema";

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginSchema))
	};
};

export const actions: Actions = {
	async default({ request, locals }) {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return fail(StatusCodes.BAD_REQUEST, { form });
		}

		const { error, data } = await locals.api.auth.login
			.$post({
				json: {
					email: form.data.email,
					password: form.data.password
				}
			})
			.then(locals.parseApiResponse);

		if (error) {
			form.message = error;
			return fail(StatusCodes.BAD_REQUEST, {
				form
			});
		}

		if (!data) {
			form.message = "Something went wrong";
			return fail(StatusCodes.BAD_REQUEST, {
				form
			});
		}

		return redirect(StatusCodes.SEE_OTHER, "/");
	}
};
