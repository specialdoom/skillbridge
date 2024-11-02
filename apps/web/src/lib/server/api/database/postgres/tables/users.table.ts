import { boolean, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { timestamps } from '../../../common/utils/table';
import { createId } from '@paralleldrive/cuid2';

export const usersTable = pgTable('users', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => createId()),
	email: text('email').notNull().unique(),
	verified: boolean('verified').notNull().default(false),
	hashedPassword: varchar('hashed_password', { length: 255 }),
	...timestamps
});
