import type { LayoutServerLoadEvent } from "./$types.js";

export const load = async (event: LayoutServerLoadEvent) => {
	return {
		user: await loadUser(event)
	};
};

async function loadUser({ locals }: LayoutServerLoadEvent) {
	const { data } = await locals.api.auth.me.$get().then(locals.parseApiResponse);

	return { email: data?.email ?? "", role: data?.role ?? "" };
}
