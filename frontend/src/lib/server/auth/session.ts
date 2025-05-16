import { db } from '$db';
import { sessionTable, userTable, type Session, type User } from '$db/schema';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { RequestEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

const THIRTY_DAYS = 1000 * 60 * 60 * 24 * 30;
const FIFTEEN_DAYS = 1000 * 60 * 60 * 24 * 15;

export function generateToken(): string {
	const bytes = new Uint8Array(20);

	crypto.getRandomValues(bytes);

	const token = encodeBase32LowerCaseNoPadding(bytes);

	return token;
}

export async function createToken(token: string, userId: number): Promise<Session> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + THIRTY_DAYS)
	};
	await db.insert(sessionTable).values(session);

	return session;
}

export async function validateSessionToken(token: string): Promise<SessionValidationResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({
			user: { id: userTable.id, email: userTable.email, name: userTable.name },
			session: sessionTable
		})
		.from(sessionTable)
		.innerJoin(userTable, eq(sessionTable.userId, userTable.id))
		.where(eq(sessionTable.id, sessionId));

	if (result.length === 0) {
		return { session: null, user: null };
	}

	const { user, session } = result[0];

	// Check if the session has expired
	// If the session has expired, delete it and return null
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessionTable).where(eq(sessionTable.id, session.id));

		return { session: null, user: null };
	}

	// If the session is within 15 days of expiration, reset the expiration date to 30 days from now
	// This is to prevent the session from expiring while the user is still active
	if (Date.now() >= session.expiresAt.getTime() - FIFTEEN_DAYS) {
		session.expiresAt = new Date(Date.now() + THIRTY_DAYS);
		await db
			.update(sessionTable)
			.set({
				expiresAt: session.expiresAt
			})
			.where(eq(sessionTable.id, session.id));
	}

	return { session, user };
}
export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		expires: expiresAt
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		path: '/',
		secure: import.meta.env.PROD,
		sameSite: 'lax',
		maxAge: 0
	});
}
export async function invalidateSession(sessionId: string): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateAllSessions(userId: number): Promise<void> {
	await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export type SessionValidationResult =
	| { session: Session; user: Partial<User> }
	| { session: null; user: null };
