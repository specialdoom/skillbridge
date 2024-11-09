import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "../../../common/utils/table";
import { usersTable } from "./users.table";
import { eventsTable } from "./events.table";

export const registrationsTable = pgTable("registrations", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id),
	eventId: text("event_id")
		.notNull()
		.references(() => eventsTable.id),
	...timestamps
});
