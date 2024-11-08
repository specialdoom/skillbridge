import { z } from "zod";

export const eventDto = z.object({
	name: z.string(),
	startDate: z.string(),
	endDate: z.string(),
	organizationId: z.string()
});

export type EventDto = z.infer<typeof eventDto>;
