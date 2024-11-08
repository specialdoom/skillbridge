import { inject, injectable } from "tsyringe";
import { Controller } from "../common/types/controller";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { eventDto } from "../dtos/event.dto";
import { OrganizationsService } from "../services/organizations.service";

@injectable()
export class OrganizationsController extends Controller {
	constructor(
		@inject(OrganizationsService) private readonly organizationsService: OrganizationsService
	) {
		super();
	}

	routes() {
		return this.controller.get("/for-user", requireAuth, async (c) =>
			c.json(await this.organizationsService.findByUserId(c.var.user.id))
		);
	}
}
