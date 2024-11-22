import { RegistrationStatus } from "$lib/shared/models/registration";
import { z } from "zod";

export const updateRegistrationDto = z.object({
	status: z.enum([
		RegistrationStatus.Pending,
		RegistrationStatus.Approved,
		RegistrationStatus.Rejected,
		RegistrationStatus.Target
	])
});

export type UpdateRegistrationDto = z.infer<typeof updateRegistrationDto>;
