import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { organizationsTable } from "../database/postgres/tables/organizations.table";
import { takeFirstOrThrow } from "../common/utils/repository";
import type { InferInsertModel } from "drizzle-orm";

type Create = InferInsertModel<typeof organizationsTable>;

@injectable()
export class OrganizationsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async create(data: Create, db = this.drizzle.db) {
		return await db.insert(organizationsTable).values(data).returning().then(takeFirstOrThrow);
	}
}
