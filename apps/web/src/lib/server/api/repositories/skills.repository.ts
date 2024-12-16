import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { skillsTable } from "../database/postgres/tables/skills.table";
import { takeFirstOrThrow } from "../common/utils/repository";
import type { InferInsertModel } from "drizzle-orm";
import { skillGroupsTable } from "../database/postgres/tables/skill-groups.table";
import { eq, ilike } from "drizzle-orm";

type Create = InferInsertModel<typeof skillsTable>;

@injectable()
export class SkillsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async findAll(db = this.drizzle.db) {
		return await db.select().from(skillsTable);
	}

	async findAllWithGroup(search: string, db = this.drizzle.db) {
		return await db
			.select({
				name: skillsTable.name,
				groupName: skillGroupsTable.name,
				groupDescription: skillGroupsTable.description,
				id: skillsTable.id
			})
			.from(skillsTable)
			.leftJoin(skillGroupsTable, eq(skillsTable.skillGroupId, skillGroupsTable.id))
			.where(ilike(skillsTable.name, `${search}%`));
	}

	async create(data: Create, db = this.drizzle.db) {
		return await db.insert(skillsTable).values(data).returning().then(takeFirstOrThrow);
	}
}
