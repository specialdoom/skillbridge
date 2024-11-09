import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
	return {
		registeredEvents: await loadRegisteredEvents(event)
	};
};

async function loadRegisteredEvents({ locals }: PageServerLoadEvent) {
	const { data } = await locals.api.events.user.$get().then(locals.parseApiResponse);

	return data ?? [];
}