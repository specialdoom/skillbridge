import { StatusCodes } from "$lib/constants/status-codes.js";
import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
	await locals.api.auth.logout.$post().then(locals.parseApiResponse);

	return redirect(StatusCodes.SEE_OTHER, "/login");
};
