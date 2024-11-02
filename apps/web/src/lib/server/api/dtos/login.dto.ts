import { z } from 'zod';

export const loginDto = z.object({
	email: z.string().email(),
	password: z.string()
});

export type LoginDto = z.infer<typeof loginDto>;
