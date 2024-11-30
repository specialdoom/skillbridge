import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";
import { StatusCodes } from "$lib/constants/status-codes";

export const load = async (event: PageServerLoadEvent) => {
	return {
		skillGroups: await loadSkillGroups(event)
	};
};

async function loadSkillGroups({ locals }: PageServerLoadEvent) {
	const { data } = await locals.api.skills.groups.$get().then(locals.parseApiResponse);

	return data ?? [];
}

export const actions: Actions = {
	async group({ locals, request }) {
		const formData = await request.formData();

		const name = formData.get("name")?.toString();
		const description = formData.get("description")?.toString();

		if (!name) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Name is required"
			});
		}

		if (!description) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Description is required"
			});
		}

		const { error } = await locals.api.skills.groups
			.$post({ json: { name, description } })
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}

		return { success: true };
	},
	async skill({ locals, request }) {
		const formData = await request.formData();

		const name = formData.get("name")?.toString();
		const skillGroupId = formData.get("skillGroupId")?.toString();

		if (!name) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Name is required"
			});
		}

		if (!skillGroupId) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Group id is required"
			});
		}

		const { error } = await locals.api.skills
			.$post({ json: { name, skillGroupId } })
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}

		return { success: true };
	}
};
