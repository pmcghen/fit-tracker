import {
	createToken,
	generateToken,
	getUserByEmail,
	getUserPasswordHash,
	setSessionTokenCookie,
	verifyPasswordHash
} from '$lib';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async (event) => {
	if (event.locals.user) {
		return redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async (event) => {
		const { request } = event;
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, {
				success: false,
				message: 'Invalid or missing fields'
			});
		}
		if (email === '' || password === '') {
			return fail(400, {
				success: false,
				message: 'Please enter your email and password.'
			});
		}
		const user = await getUserByEmail(email);
		if (user === null) {
			return fail(400, {
				success: false,
				message: 'Invalid email or password.'
			});
		}

		const pwHash = await getUserPasswordHash(user.id);
		if (!pwHash) {
			return fail(400, {
				success: false,
				message: 'Invalid email or password.'
			});
		}
		const validPassword = await verifyPasswordHash(pwHash, password);
		if (!validPassword) {
			return fail(400, {
				message: 'Invalid email or password',
				email
			});
		}
		const sessionToken = generateToken();
		const session = await createToken(sessionToken, user.id);

		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(303, '/');
	}
};
