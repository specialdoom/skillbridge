import { UserRole } from "$lib/shared/models/role";
import { z } from "zod";

export const registerDto = z.object({
	email: z.string().email(),
	password: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	name: z.string().optional(),
	description: z.string().optional(),
	role: z.enum([UserRole.Volunteer, UserRole.Manager]).default(UserRole.Volunteer)
});

export type RegisterDto = z.infer<typeof registerDto>;
