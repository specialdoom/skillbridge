import { inject, injectable } from "tsyringe";
import { DrizzleService } from "../services/drizzle.service";
import { registrationsTable } from "../database/postgres/tables/registrations.table";
import type { InferInsertModel } from "drizzle-orm";
import { takeFirst, takeFirstOrThrow } from "../common/utils/repository";
import { eq, and } from "drizzle-orm";
import { usersTable } from "../database/postgres/tables";

type Create = InferInsertModel<typeof registrationsTable>;

@injectable()
export class RegistrationsRepository {
	constructor(@inject(DrizzleService) private drizzle: DrizzleService) {}

	async create(data: Create, db = this.drizzle.db) {
		return await db.insert(registrationsTable).values(data).returning().then(takeFirstOrThrow);
	}

	async findByUserIdAndEventId(userId: string, eventId: string, db = this.drizzle.db) {
		return await db
			.select()
			.from(registrationsTable)
			.where(and(eq(registrationsTable.userId, userId), eq(registrationsTable.eventId, eventId)))
			.then(takeFirst);
	}

	async findAllByEventId(eventId: string, db = this.drizzle.db) {
		return await db
			.select({
				firstName: usersTable.firstName,
				lastName: usersTable.lastName,
				email: usersTable.email,
				registeredAt: registrationsTable.createdAt,
				status: registrationsTable.status
			})
			.from(registrationsTable)
			.fullJoin(usersTable, eq(usersTable.id, registrationsTable.userId))
			.where(eq(registrationsTable.eventId, eventId));
	}
}
