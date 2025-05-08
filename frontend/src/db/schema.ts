import type { InferSelectModel } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

const TIMESTAMPS = {
	created_at: timestamp().notNull().defaultNow(),
	updated_at: timestamp().defaultNow(),
	deleted_at: timestamp()
};

export const userTable = pgTable('user', {
	id: serial().primaryKey().notNull(),
	name: text(),
	email: text().notNull().unique(),
	password_hash: text().notNull(),
	confirmed: boolean().default(false),
	...TIMESTAMPS
});

export const userInformationTable = pgTable('user_information', {
	id: serial().primaryKey().notNull(),
	userId: integer('user_id')
		.references(() => userTable.id)
		.notNull(),
	...TIMESTAMPS
});

export const sessionTable = pgTable('session', {
	id: text().primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});

export type User = InferSelectModel<typeof userTable>;
export type UserInformation = InferSelectModel<typeof userInformationTable>;
export type Session = InferSelectModel<typeof sessionTable>;
