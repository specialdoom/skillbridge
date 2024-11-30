import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { skillGroupsTable } from "../database/postgres/tables/skill-groups.table";
import type { InferInsertModel } from "drizzle-orm";
import { takeFirstOrThrow } from "../common/utils/repository";

type Create = InferInsertModel<typeof skillGroupsTable>;

@injectable()
export class SkillGroupsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async findAll(db = this.drizzle.db) {
		return await db.select().from(skillGroupsTable);
	}

	async create(data: Create, db = this.drizzle.db) {
		return await db.insert(skillGroupsTable).values(data).returning().then(takeFirstOrThrow);
	}
}
