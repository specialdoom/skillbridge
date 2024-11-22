import { StatusCodes } from "$lib/constants/status-codes";
import { fail } from "@sveltejs/kit";

export const actions = {
	async default({ request, locals }) {
		const formData = await request.formData();

		const firstName = formData.get("firstName")?.toString();
		const lastName = formData.get("lastName")?.toString();

		if (!firstName || !lastName) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "First name and last name are required"
			});
		}

		const { error } = await locals.api.users
			.$patch({ json: { firstName, lastName } })
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}
	}
};
