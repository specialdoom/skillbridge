import { z } from "zod";

export const registerDto = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string().optional(),
	description: z.string().optional()
});

export type RegisterDto = z.infer<typeof registerDto>;
