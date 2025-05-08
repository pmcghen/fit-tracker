import { eq } from 'drizzle-orm';
import { db } from '../../../db';
import { userTable, type User } from '../../../db/schema';
import { hashPassword } from './password';

export async function createUser(email: string, password: string): Promise<User> {
	const hashedPassword = await hashPassword(password);
	let user: User | null = null;
	try {
		const row = await db
			.insert(userTable)
			.values({
				email,
				password_hash: hashedPassword
			})
			.returning();

		user = row[0];
	} catch (error) {
		console.error('Error creating user:', error);
		throw new Error('Unexpected error occurred while creating user');
	}

	return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
	const result = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

	if (result.length === 0) {
		return null;
	}

	return result[0];
}
