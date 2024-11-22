import { z } from "zod";

export const userDto = z.object({
	firstName: z.string(),
	lastName: z.string()
});

export type UserDto = z.infer<typeof userDto>;
