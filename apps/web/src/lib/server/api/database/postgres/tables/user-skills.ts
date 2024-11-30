import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";
import { skillsTable } from "./skills.table";

export const userSkills = pgTable("userSkills", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id),
	skillId: text("event_id")
		.notNull()
		.references(() => skillsTable.id)
});
