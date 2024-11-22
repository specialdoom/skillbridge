import { boolean, pgEnum, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { timestamps } from "../../../common/utils/table";
import { createId } from "@paralleldrive/cuid2";
import { organizationsTable } from "./organizations.table";
import { UserRole } from "$lib/shared/models/role";

export const roleEnum = pgEnum("role", [UserRole.Volunteer, UserRole.Manager]);

export const usersTable = pgTable("users", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text("email").notNull().unique(),
	verified: boolean("verified").notNull().default(false),
	hashedPassword: varchar("hashed_password", { length: 255 }),
	firstName: text("first_name"),
	lastName: text("last_name"),
	role: roleEnum().default(UserRole.Volunteer),
	organizationId: text("organization_id").references(() => organizationsTable.id),
	...timestamps
});
