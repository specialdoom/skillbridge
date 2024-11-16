import { inject, injectable } from "tsyringe";
import { RegistrationsService } from "../services/registrations.service";
import { Controller } from "../common/types/controller";
import { requireAuth } from "../middlewares/require-auth.middleware";

@injectable()
export class RegistrationsController extends Controller {
	constructor(@inject(RegistrationsService) private registrationsService: RegistrationsService) {
		super();
	}

	routes() {
		return this.controller
			.get("/:eventId", requireAuth, async (c) =>
				c.json(await this.registrationsService.findAllByEventId(c.req.param("eventId")))
			)
			.post("/apply/:eventId", requireAuth, async (c) => {
				const userId = c.var.user.id;
				const eventId = c.req.param("eventId");

				await this.registrationsService.create(userId, eventId);

				return c.json({ message: "ok" });
			});
	}
}
