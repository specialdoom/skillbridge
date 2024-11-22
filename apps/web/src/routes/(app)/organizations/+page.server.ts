import type { PageServerLoadEvent } from "./$types";

export const load = async (event: PageServerLoadEvent) => {
	return {
		organizations: await loadOrganizations(event)
	};
};

async function loadOrganizations({ locals }: PageServerLoadEvent) {
	const { data } = await locals.api.organizations["for-user"].$get().then(locals.parseApiResponse);

	return data ?? [];
}
