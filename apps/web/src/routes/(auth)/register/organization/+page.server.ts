import { StatusCodes } from "$lib/constants/status-codes";
import { UserRole } from "$lib/shared/models/role";
import { fail, redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();

		const email = formData.get("email")?.toString();
		const name = formData.get("name")?.toString();
		const description = formData.get("description")?.toString();
		const password = formData.get("password")?.toString();
		const confirmPassword = formData.get("confirmPassword");
		const firstName = formData.get("firstName")?.toString();
		const lastName = formData.get("lastName")?.toString();

		if (!firstName || !lastName) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "First and last name are required"
			});
		}

		if (!name) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Name is required"
			});
		}

		if (!email || !password) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Email and password are required"
			});
		}

		if (password !== confirmPassword) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Passwords do not match"
			});
		}

		const { error } = await locals.api.auth.register
			.$post({
				json: {
					name,
					description,
					email,
					password,
					firstName,
					lastName,
					role: UserRole.Manager
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
