import { createId } from "@paralleldrive/cuid2";
import { date, pgTable, text } from "drizzle-orm/pg-core";
import { organizationsTable } from "./organizations.table";
import { timestamps } from "../../../common/utils/table";

export const eventsTable = pgTable("events", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name").notNull(),
	description: text("description"),
	organisationId: text("organisation_id")
		.notNull()
		.references(() => organizationsTable.id),
	startDate: date("start_date").notNull(),
	endDate: date("end_date").notNull(),
	...timestamps
});
