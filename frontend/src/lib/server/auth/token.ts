import { db } from '$db';
import { codesTable } from '$db/schema';
import { eq } from 'drizzle-orm';
import { generateRandomOTP } from './utils';

export async function createVerifyToken(userId: number): Promise<string> {
	await deleteUserToken(userId);
	const token = generateRandomOTP();
	await db.insert(codesTable).values({ code: token, userId });

	return token;
}

export async function verifyToken(token: string): Promise<boolean> {
	const row = await db.select().from(codesTable).where(eq(codesTable.code, token)).limit(1);

	if (row.length === 0) {
		return false;
	}

	const { userId } = row[0];

	await deleteUserToken(userId);

	return true;
}

export async function deleteUserToken(userId: number): Promise<void> {
	await db.delete(codesTable).where(eq(codesTable.userId, userId));
}
