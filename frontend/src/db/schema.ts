import { relations, sql, type InferSelectModel } from 'drizzle-orm';
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp
} from 'drizzle-orm/pg-core';

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

export const itemsTable = pgTable('items', {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	name: text().notNull(),
	description: text(),
	brand: text(),
	weight: integer(),
	quantity: integer(),
	userId: integer('user_id')
		.references(() => userTable.id, { onDelete: 'cascade' })
		.notNull(),
	...TIMESTAMPS
});

export const itemsRelations = relations(itemsTable, ({ many }) => ({
	bags: many(bagsTable)
}));

export const bagType = pgEnum('bagType', ['backpack', 'bike bag']);
export const bagPosition = pgEnum('bagPosition', [
	'back',
	'frame',
	'handlebar',
	'seat',
	'top tube',
	'rear rack',
	'stem',
	'fork'
]);

export const bagsTable = pgTable('bags', {
	id: integer().generatedAlwaysAsIdentity().primaryKey(),
	name: text().notNull(),
	type: bagType().notNull(),
	userId: integer('user_id')
		.references(() => userTable.id, { onDelete: 'cascade' })
		.notNull()
});

export const bagsRelations = relations(bagsTable, ({ many }) => ({
	items: many(itemsTable)
}));

export const itemsToBags = pgTable(
	'items_to_bags',
	{
		bagId: integer('bag_id')
			.notNull()
			.references(() => bagsTable.id),
		itemId: integer('item_id')
			.notNull()
			.references(() => itemsTable.id)
	},
	(t) => [primaryKey({ columns: [t.bagId, t.itemId] })]
);

export const itemsToBagsRelations = relations(itemsToBags, ({ one }) => ({
	item: one(itemsTable, {
		fields: [itemsToBags.itemId],
		references: [itemsTable.id]
	}),
	bag: one(bagsTable, {
		fields: [itemsToBags.bagId],
		references: [bagsTable.id]
	})
}));

export type User = InferSelectModel<typeof userTable>;
export type UserInformation = InferSelectModel<typeof userInformationTable>;
export type Session = InferSelectModel<typeof sessionTable>;
export type Code = InferSelectModel<typeof codesTable>;
export type Items = InferSelectModel<typeof itemsTable>;
