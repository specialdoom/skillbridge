import { createId } from "@paralleldrive/cuid2";
import { date, pgTable, text } from "drizzle-orm/pg-core";
import { usersTable } from "./users.table";

export const volunteersTable = pgTable("volunteers", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	userId: text("user_id")
		.notNull()
		.references(() => usersTable.id, { onDelete: "cascade" }),
	firstName: text("first_name"),
	lastName: text("last_name"),
	birthDate: date("birth_date")
});
