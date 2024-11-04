import { StatusCodes } from '$lib/constants/status-codes';
import { redirect } from '@sveltejs/kit';

export const load = () => {
	return redirect(StatusCodes.PERMANENT_REDIRECT, '/dashboard');
};
