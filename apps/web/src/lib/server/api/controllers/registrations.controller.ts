import { inject, injectable } from "tsyringe";
import { RegistrationsService } from "../services/registrations.service";
import { Controller } from "../common/types/controller";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { updateRegistrationDto } from "../dtos/update-registration.dto";
import { zValidator } from "@hono/zod-validator";

@injectable()
export class RegistrationsController extends Controller {
	constructor(@inject(RegistrationsService) private registrationsService: RegistrationsService) {
		super();
	}

	routes() {
		return this.controller
			.get("/:eventId", requireAuth, async (c) =>
				c.json(
					await this.registrationsService.findAllByEventId(
						c.req.param("eventId"),
						c.req.query("filter") as any
					)
				)
			)
			.post("/apply/:eventId", requireAuth, async (c) => {
				const userId = c.var.user.id;
				const eventId = c.req.param("eventId");

				await this.registrationsService.create(userId, eventId);

				return c.json({ message: "ok" });
			})
			.patch("/approve/:registrationId", requireAuth, async (c) => {
				const registrationId = c.req.param("registrationId");

				await this.registrationsService.approve(registrationId);

				return c.json({ message: "ok" });
			})
			.patch(
				"/update/:registrationId",
				requireAuth,
				zValidator("json", updateRegistrationDto),
				async (c) => {
					console.log("controller");
					const registrationId = c.req.param("registrationId");
					const { status } = c.req.valid("json");

					console.log(status);

					await this.registrationsService.update(registrationId, status);

					return c.json({ message: "ok" });
				}
			);
	}
}
