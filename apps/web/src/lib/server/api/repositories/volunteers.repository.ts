import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import type { InferInsertModel } from "drizzle-orm";
import { volunteersTable } from "../database/postgres/tables/volunteers.table";
import { takeFirstOrThrow } from "../common/utils/repository";

export type Create = InferInsertModel<typeof volunteersTable>;

@injectable()
export class VolunteersRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async create(data: Create, db = this.drizzle.db) {
		return db.insert(volunteersTable).values(data).returning().then(takeFirstOrThrow);
	}
}
