import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { organizationsTable } from "../database/postgres/tables/organizations.table";
import { takeFirstOrThrow } from "../common/utils/repository";
import { eq, type InferInsertModel } from "drizzle-orm";
import { usersTable } from "../database/postgres/tables";

type Create = InferInsertModel<typeof organizationsTable>;

@injectable()
export class OrganizationsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async create(data: Create, db = this.drizzle.db) {
		return await db.insert(organizationsTable).values(data).returning().then(takeFirstOrThrow);
	}

	async findByUserId(userId: string, db = this.drizzle.db) {
		return await db
			.select({
				id: organizationsTable.id,
				name: organizationsTable.name,
				userId: usersTable.id
			})
			.from(organizationsTable)
			.leftJoin(usersTable, eq(usersTable.organizationId, organizationsTable.id))
			.where(eq(usersTable.id, userId));
	}
}
