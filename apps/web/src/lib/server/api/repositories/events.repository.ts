import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { eq, type InferInsertModel } from "drizzle-orm";
import { eventsTable } from "../database/postgres/tables/events.table";
import { takeFirst, takeFirstOrThrow } from "../common/utils/repository";
import { registrationsTable } from "../database/postgres/tables/registrations.table";

export type Create = InferInsertModel<typeof eventsTable>;

@injectable()
export class EventsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async create(data: Create, db = this.drizzle.db) {
		return db.insert(eventsTable).values(data).returning().then(takeFirstOrThrow);
	}

	async findAll(db = this.drizzle.db) {
		return db.select().from(eventsTable);
	}

	async findById(id: string, db = this.drizzle.db) {
		return db.select().from(eventsTable).where(eq(eventsTable.id, id)).then(takeFirstOrThrow);
	}

	async findByUser(userId: string, db = this.drizzle.db) {
		return await db
			.select({
				id: eventsTable.id,
				name: eventsTable.name,
				startDate: eventsTable.startDate,
				endDate: eventsTable.endDate
			})
			.from(eventsTable)
			.rightJoin(registrationsTable, eq(registrationsTable.eventId, eventsTable.id))
			.where(eq(registrationsTable.userId, userId));
	}
}
