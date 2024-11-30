import { z } from "zod";

export const skillDto = z.object({ name: z.string(), skillGroupId: z.string() });

export type SkillDto = z.infer<typeof skillDto>;
