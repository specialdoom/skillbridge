import { StatusCodes } from "$lib/constants/status-codes";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
	return {
		event: await loadEvent(event),
		registrations: await loadRegistrations(event)
	};
};

async function loadEvent({ locals, params }: PageServerLoadEvent) {
	const { data } = await locals.api.events.one[":id"]
		.$get({
			param: {
				id: params.eventid
			}
		})
		.then(locals.parseApiResponse);

	if (!data) {
		return redirect(StatusCodes.SEE_OTHER, "/events");
	}

	return data;
}

async function loadRegistrations({ locals, params }: PageServerLoadEvent) {
	const { data } = await locals.api.registrations[":eventId"]
		.$get({
			param: {
				eventId: params.eventid
			}
		})
		.then(locals.parseApiResponse);

	return data ?? [];
}
