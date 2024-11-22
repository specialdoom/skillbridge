import { z } from "zod";

export const registerDto = z.object({
	email: z.string().email(),
	password: z.string(),
	firstName: z.string(),
	lastName: z.string(),
	name: z.string().optional(),
	description: z.string().optional(),
	role: z.enum(["volunteer", "manager"]).default("volunteer")
});

export type RegisterDto = z.infer<typeof registerDto>;
