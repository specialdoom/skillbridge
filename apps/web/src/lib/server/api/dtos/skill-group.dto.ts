import { z } from "zod";

export const skillGroupDto = z.object({
	name: z.string(),
	description: z.string()
});

export type SkillGroupDto = z.infer<typeof skillGroupDto>;
