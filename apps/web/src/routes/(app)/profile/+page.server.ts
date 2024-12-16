import { StatusCodes } from "$lib/constants/status-codes";
import { fail } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
	return {
		skills: await loadSkills(event),
		userSkills: await loadUserSkills(event)
	};
};

export const actions = {
	async userDetails({ request, locals }) {
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
	},
	async userSkills({ request, locals }) {
		const formData = await request.formData();
		const skillsIds = formData.getAll("skillIds") as string[];

		if (!skillsIds.length) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "You must select at least one skill"
			});
		}

		const { error } = await locals.api.skills.user.add
			.$post({
				json: {
					skillsIds: skillsIds
				}
			})
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}
	}
};

async function loadSkills(event: PageServerLoadEvent) {
	const { data } = await event.locals.api.skills.all.$get().then(event.locals.parseApiResponse);

	return data ?? [];
}

async function loadUserSkills(event: PageServerLoadEvent) {
	const { data } = await event.locals.api.skills.user.all
		.$get()
		.then(event.locals.parseApiResponse);

	return data ?? [];
}
