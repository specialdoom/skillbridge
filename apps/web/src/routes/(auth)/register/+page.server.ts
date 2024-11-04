import { StatusCodes } from "$lib/constants/status-codes";
import { redirect } from "@sveltejs/kit";

export const load = () => redirect(StatusCodes.PERMANENT_REDIRECT, "/register/volunteer");
