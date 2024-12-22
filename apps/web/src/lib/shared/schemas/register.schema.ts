import { z } from "zod";

export const registerSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	confirmPassword: z.string(),
	firstName: z.string(),
	lastName: z.string()
});

export type RegisterSchema = typeof registerSchema;
