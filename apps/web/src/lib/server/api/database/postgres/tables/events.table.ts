import { createId } from "@paralleldrive/cuid2";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organizationsTable } from "./organizations.table";
import { timestamps } from "../../../common/utils/table";

export const eventsTable = pgTable("events", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name").notNull(),
	description: text("description"),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organizationsTable.id),
	startDate: timestamp("start_date").notNull(),
	endDate: timestamp("end_date").notNull(),
	...timestamps
});
