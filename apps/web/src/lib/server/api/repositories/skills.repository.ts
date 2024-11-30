import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { skillsTable } from "../database/postgres/tables/skills.table";
import { takeFirstOrThrow } from "../common/utils/repository";
import type { InferInsertModel } from "drizzle-orm";

type Create = InferInsertModel<typeof skillsTable>;

@injectable()
export class SkillsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async findAll(db = this.drizzle.db) {
		return await db.select().from(skillsTable);
	}

	async create(data: Create, db = this.drizzle.db) {
		return await db.insert(skillsTable).values(data).returning().then(takeFirstOrThrow);
	}
}
