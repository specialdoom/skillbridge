import { StatusCodes } from "$lib/constants/status-codes";
import { fail, redirect } from "@sveltejs/kit";
import { RegistrationStatus } from "$lib/shared/models/registration";
import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
	return {
		event: await loadEvent(event),
		registrations: await loadRegistrations(event, RegistrationStatus.Approved),
		pendingRegistrations: await loadRegistrations(event, RegistrationStatus.Pending),
		rejectedRegistrations: await loadRegistrations(event, RegistrationStatus.Rejected)
	};
};

export const actions = {
	async update({ request, locals }) {
		const formData = await request.formData();
		const registrationId = formData.get("registrationId")?.toString();
		const status = formData.get("status") as RegistrationStatus;

		if (!status) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Status is required"
			});
		}

		if (!registrationId) {
			return fail(StatusCodes.BAD_REQUEST, {
				error: "Registration id is required"
			});
		}

		console.log(status);

		await locals.api.registrations.update[":registrationId"].$patch({
			param: { registrationId },
			json: { status }
		});
	}
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

async function loadRegistrations(
	{ locals, params }: PageServerLoadEvent,
	filter?: RegistrationStatus
) {
	const { data } = await locals.api.registrations[":eventId"]
		.$get({
			query: {
				filter
			},
			param: {
				eventId: params.eventid
			}
		})
		.then(locals.parseApiResponse);

	return data ?? [];
}
