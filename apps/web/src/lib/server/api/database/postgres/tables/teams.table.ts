import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { eventsTable } from "./events.table";

export const teamsTable = pgTable("teams", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	eventId: text("event_id")
		.notNull()
		.references(() => eventsTable.id),
	coordinatorId: text("coordinator_id")
		.notNull()
		.references(() => eventsTable.id),
	name: text("name").notNull()
});
