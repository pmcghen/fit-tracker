import { db } from '$db';
import { userTable } from '$db/schema';
import { eq } from 'drizzle-orm';

export function verifyEmailInput(email: string): boolean {
	return /^.+@.+\..+$/.test(email) && email.length < 256;
}

export async function checkForEmail(email: string): Promise<boolean> {
	const row = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

	return row.length > 0;
}
