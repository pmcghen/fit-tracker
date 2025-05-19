import { db } from '$db';
import { userTable, type User } from '$db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from './password';

export async function createUser(userToCreate: {
	email: string;
	password: string;
	name: string;
}): Promise<User> {
	const { email, password, name } = userToCreate;
	const hashedPassword = await hashPassword(password);
	let user: User | null = null;
	try {
		const row = await db
			.insert(userTable)
			.values({
				email,
				password_hash: hashedPassword,
				name
			})
			.returning();

		user = row[0];
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Unexpected error occurred while creating user');
	}

	return user;
}

export async function getUserPasswordHash(userId: number): Promise<string | null> {
	const result = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);

	if (result.length === 0) {
		return null;
	}

	return result[0].password_hash;
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const result = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

	if (result.length === 0) {
		return null;
	}

	return result[0];
}

export async function confirmUserEmail(userId: number): Promise<void> {
	try {
		await db.update(userTable).set({ confirmed: true }).where(eq(userTable.id, userId));
	} catch (error) {
		console.error('Error confirming user email:', error);
		throw new Error('Unexpected error occurred while confirming user email');
	}
}
