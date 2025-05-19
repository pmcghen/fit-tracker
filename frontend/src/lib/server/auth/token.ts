import { db } from '$db';
import { codesTable, userTable } from '$db/schema';
import { and, eq } from 'drizzle-orm';
import { confirmUserEmail } from './user';
import { generateRandomOTP } from './utils';

export async function createVerifyToken(userId: number): Promise<string> {
	const user = await db.select().from(userTable).where(eq(userTable.id, userId)).limit(1);

	if (user.length === 0) {
		throw new Error('User not found');
	}
	if (user[0].confirmed) {
		throw new Error('User already confirmed');
	}

	await deleteUserToken(userId);
	const token = generateRandomOTP();
	await db.insert(codesTable).values({ code: token, userId });

	return token;
}

export async function verifyToken(token: string, userId: number): Promise<boolean> {
	const row = await db
		.select()
		.from(codesTable)
		.where(and(eq(codesTable.code, token), eq(codesTable.userId, userId)))
		.limit(1);

	if (row.length === 0) {
		return false;
	}

	await confirmUserEmail(userId);
	await deleteUserToken(userId);

	return true;
}

export async function deleteUserToken(userId: number): Promise<void> {
	await db.delete(codesTable).where(eq(codesTable.userId, userId));
}
