import { inject, injectable } from "tsyringe";
import { Controller } from "../common/types/controller";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { UsersService } from "../services/users.service";
import { userDto } from "../dtos/user.dto";
import { UserRole } from "$lib/shared/models/role";

@injectable()
export class UsersController extends Controller {
	constructor(@inject(UsersService) private readonly usersService: UsersService) {
		super();
	}

	routes() {
		return this.controller
			.patch("/", requireAuth, zValidator("json", userDto), async (c) => {
				const { firstName, lastName } = c.req.valid("json");

				await this.usersService.update(c.var.user.id, firstName, lastName);

				return c.json({ message: "ok" });
			})
			.get("/volunteers/new", requireAuth, async (c) => {
				return c.json(await this.usersService.findNewUsers(UserRole.Volunteer));
			});
	}
}
