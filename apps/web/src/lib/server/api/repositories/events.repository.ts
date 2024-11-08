import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import type { InferInsertModel } from "drizzle-orm";
import { eventsTable } from "../database/postgres/tables/events.table";
import { takeFirstOrThrow } from "../common/utils/repository";

export type Create = InferInsertModel<typeof eventsTable>;

@injectable()
export class EventsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async create(data: Create, db = this.drizzle.db) {
		return db.insert(eventsTable).values(data).returning().then(takeFirstOrThrow);
	}

	async findAll(db = this.drizzle.db) {
		return db.query.eventsTable.findMany();
	}
}
