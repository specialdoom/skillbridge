import { inject, injectable } from "tsyringe";
import { Controller } from "../common/types/controller";
import { SkillsService } from "../services/skills.service";
import { requireAuth } from "../middlewares/require-auth.middleware";
import { zValidator } from "@hono/zod-validator";
import { skillGroupDto } from "../dtos/skill-group.dto";
import { skillDto } from "../dtos/skill.dto";
import { userSkillDto } from "../dtos/user-skill.dto";

@injectable()
export class SkillsController extends Controller {
	constructor(@inject(SkillsService) private skillsService: SkillsService) {
		super();
	}

	routes() {
		return this.controller
			.get("/groups", requireAuth, async (c) => {
				return c.json(await this.skillsService.findAllSkillsGroup());
			})
			.post("/groups", requireAuth, zValidator("json", skillGroupDto), async (c) => {
				const { name, description } = c.req.valid("json");

				return c.json(await this.skillsService.createSkillGroup(name, description));
			})
			.post("/", requireAuth, zValidator("json", skillDto), async (c) => {
				const { name, skillGroupId } = c.req.valid("json");

				return c.json(await this.skillsService.createSkill(name, skillGroupId));
			})
			.get("/all", requireAuth, async (c) => {
				const search = c.req.query("search") ?? "";

				return c.json(await this.skillsService.findAll(search));
			})
			.get("/user/all", requireAuth, async (c) => {
				return c.json(await this.skillsService.findAllByUserId(c.var.user.id));
			})
			.post("/user/add", requireAuth, zValidator("json", userSkillDto), async (c) => {
				const skillsIds = c.req.valid("json").skillsIds;
				const userId = c.var.user.id;

				return c.json(await this.skillsService.addSkill(userId, skillsIds));
			});
	}
}
