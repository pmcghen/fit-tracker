import { sql, type InferSelectModel } from 'drizzle-orm';
import { boolean, integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

const TIMESTAMPS = {
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().defaultNow(),
	deleted_at: timestamp()
};

export const userTable = pgTable('user', {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	name: text(),
	email: text().notNull().unique(),
	password_hash: text().notNull(),
	confirmed: boolean().default(false),
	...TIMESTAMPS
});

export const userInformationTable = pgTable('user_information', {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	userId: integer('user_id')
		.references(() => userTable.id, { onDelete: 'cascade' })
		.notNull(),

	...TIMESTAMPS
});

export const codesTable = pgTable('code', {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	userId: integer('user_id')
		.references(() => userTable.id, { onDelete: 'cascade' })
		.notNull(),
	code: text().notNull(),
	expires_at: timestamp()
		.default(sql`(NOW() + INTERVAL '10 minutes')`)
		.notNull(),
	...TIMESTAMPS
});

export const sessionTable = pgTable('session', {
	id: text().primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type UserInformation = InferSelectModel<typeof userInformationTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Code = InferSelectModel<typeof codesTable>;
