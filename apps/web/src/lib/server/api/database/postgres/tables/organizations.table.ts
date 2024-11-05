import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";

export const organizationsTable = pgTable("organizations", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name").notNull(),
	description: text("description")
});
