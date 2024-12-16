import { createId } from "@paralleldrive/cuid2";
import { pgTable, text } from "drizzle-orm/pg-core";
import { skillsTable } from "./skills.table";
import { eventsTable } from "./events.table";

export const eventSkillsTable = pgTable("eventSkills", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	eventId: text("user_id")
		.notNull()
		.references(() => eventsTable.id),
	skillId: text("event_id")
		.notNull()
		.references(() => skillsTable.id)
});
