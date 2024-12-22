import { StatusCodes } from "$lib/constants/status-codes";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { registerSchema } from "$lib/shared/schemas/register.schema";
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(registerSchema));

    if(!form.valid) {
      return fail(StatusCodes.BAD_REQUEST, {
        form
      });
    }
    const {email, password, firstName, lastName} = form.data;

		const { error } = await locals.api.auth.register
			.$post({
				json: {
					email,
					password,
					firstName,
					lastName
				}
			})
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}

		return redirect(StatusCodes.SEE_OTHER, "/login");
	}
};
