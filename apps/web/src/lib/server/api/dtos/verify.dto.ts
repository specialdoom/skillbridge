import { z } from 'zod';

export const verifyDto = z.object({
	sessionId: z.string()
});

export type VerifyDto = z.infer<typeof verifyDto>;
