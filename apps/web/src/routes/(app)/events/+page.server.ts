import { fail, type Actions } from "@sveltejs/kit";
import { StatusCodes } from "$lib/constants/status-codes";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
	return {
		organizations: await loadOrganizations(event),
		events: await loadEvents(event)
	};
};

async function loadOrganizations({ locals }: PageServerLoadEvent): Promise<any[]> {
	const { data } = await locals.api.organizations["for-user"].$get().then(locals.parseApiResponse);

	return data ?? [];
}

async function loadEvents({ locals }: PageServerLoadEvent): Promise<any[]> {
	const { data } = await locals.api.events.$get().then(locals.parseApiResponse);

	return data ?? [];
}

export const actions: Actions = {
	async add({ request, locals }) {
		const formData = await request.formData();

		const name = formData.get("name")?.toString();
		const startDate = formData.get("startDate")?.toString();
		const endDate = formData.get("endDate")?.toString();
		const organizationId = formData.get("organizationId")?.toString();

		if (!name || !startDate || !endDate || !organizationId) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Name, start date, end date, and organization id are required"
			});
		}

		const { error } = await locals.api.events
			.$post({
				json: {
					name,
					startDate,
					endDate,
					organizationId
				}
			})
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: error.error.issues[0]?.message
			});
		}

		return { success: true };
	},
	async apply({ request, locals }) {
		const formData = await request.formData();
		const eventId = formData.get("eventId")?.toString();

		if (!eventId) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Event id is required"
			});
		}

		const { error } = await locals.api.registrations.apply[":eventId"]
			.$post({
				param: {
					eventId
				}
			})
			.then(locals.parseApiResponse);

		if (error) {
			return fail(StatusCodes.BAD_REQUEST, {
				error
			});
		}

		return { success: true };
	}
};
