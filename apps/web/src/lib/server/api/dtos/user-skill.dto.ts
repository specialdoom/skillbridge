import { z } from "zod";

export const userSkillDto = z.object({
	skillsIds: z.array(z.string())
});

export type UserSkillDto = z.infer<typeof userSkillDto>;
