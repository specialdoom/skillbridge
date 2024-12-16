import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { takeFirstOrThrow } from "../common/utils/repository";
import { userSkillsTable } from "../database/postgres/tables/user-skills.table";
import { eq } from "drizzle-orm";
import { skillsTable } from "../database/postgres/tables/skills.table";

@injectable()
export class UserSkillsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async create(userId: string, skillsIds: string[], db = this.drizzle.db) {
		return await db
			.insert(userSkillsTable)
			.values(skillsIds.map((id) => ({ userId, skillId: id })))
			.returning()
			.then(takeFirstOrThrow);
	}

	async findAllForUser(userId: string, db = this.drizzle.db) {
		return await db
			.select({
				id: skillsTable.id,
				name: skillsTable.name
			})
			.from(userSkillsTable)
			.innerJoin(skillsTable, eq(skillsTable.id, userSkillsTable.skillId))
			.where(eq(userSkillsTable.userId, userId));
	}
}
