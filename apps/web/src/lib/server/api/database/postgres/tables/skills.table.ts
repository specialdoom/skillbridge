import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { skillGroupsTable } from "./skill-groups.table";

export const skillsTable = pgTable("skills", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	name: text("name").notNull(),
	skillGroupId: text("group_id")
		.notNull()
		.references(() => skillGroupsTable.id)
});
