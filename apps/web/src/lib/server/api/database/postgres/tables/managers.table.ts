import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { organizationsTable } from "./organizations.table";

export const managersTable = pgTable("managers", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	organizationId: text("organization_id")
		.notNull()
		.references(() => organizationsTable.id)
});
