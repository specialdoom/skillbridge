import { boolean, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../../../common/utils/table";
import { createId } from "@paralleldrive/cuid2";
import { organizationsTable } from "./organizations.table";

export const roleEnum = pgEnum("role", ["volunteer", "manager"]);

export const usersTable = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text("email").notNull().unique(),
	verified: boolean("verified").notNull().default(false),
	hashedPassword: varchar("hashed_password", { length: 255 }),
	firstName: text("first_name"),
	lastName: text("last_name"),
	role: roleEnum().default("volunteer"),
	organizationId: text("organization_id").references(() => organizationsTable.id),
	...timestamps
});
