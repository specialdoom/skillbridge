import { inject, injectable } from "tsyringe";
import { Controller } from "../common/types/controller";
import { EventsService } from "../services/events.service";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { eventDto } from "../dtos/event.dto";

@injectable()
export class EventsController extends Controller {
	constructor(@inject(EventsService) private readonly eventsService: EventsService) {
		super();
	}

	routes() {
		return this.controller
			.get("/", requireAuth, async (c) => c.json(await this.eventsService.findAll()))
			.get("/user", requireAuth, async (c) =>
				c.json(await this.eventsService.findByUser(c.var.user.id))
			)
			.post("/", requireAuth, zValidator("json", eventDto), async (c) => {
				const { name, startDate, endDate, organizationId } = c.req.valid("json");

				await this.eventsService.create(
					name,
					new Date(startDate),
					new Date(endDate),
					organizationId
				);

				return c.json({ message: "ok" });
			});
	}
}
