import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
	return {
		registeredEvents: await loadRegisteredEvents(event),
		newVolunteers: await loadNewVolunteers(event)
	};
};

async function loadRegisteredEvents({ locals }: PageServerLoadEvent) {
	const { data } = await locals.api.events.user.$get().then(locals.parseApiResponse);

	return data ?? [];
}

async function loadNewVolunteers({ locals }: PageServerLoadEvent) {
	const { data } = await locals.api.users.volunteers.new.$get().then(locals.parseApiResponse);

	return data ?? [];
}
