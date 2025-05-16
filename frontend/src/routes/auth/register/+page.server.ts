import { checkForEmail, createUser, verifyEmailInput } from '$lib';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async (event) => {
	if (event.locals.user) {
		return redirect(303, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const name = formData.get('name');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm_password');

		if (!email || !name || !password || !confirmPassword) {
			return fail(400, {
				success: false,
				message: 'All fields are required'
			});
		}
		if (
			typeof email !== 'string' ||
			typeof name !== 'string' ||
			typeof password !== 'string' ||
			typeof confirmPassword !== 'string'
		) {
			return fail(400, {
				success: false,
				message: 'Invalid input'
			});
		}

		if (password !== confirmPassword) {
			return fail(400, {
				success: false,
				message: 'Passwords do not match'
			});
		}

		if (!verifyEmailInput(email as string)) {
			return fail(400, {
				success: false,
				message: 'Invalid email address'
			});
		}

		const emailExists = await checkForEmail(email as string);
		if (emailExists) {
			return fail(400, {
				success: false,
				message: 'Invalid email address'
			});
		}

		const user = {
			email: email as string,
			name: name as string,
			password: password as string
		};

		try {
			await createUser(user);
		} catch (error) {
			console.error('Error creating user:', error);
			return fail(500, {
				success: false,
				message: 'Internal server error'
			});
		}
		// TODO: send email verification

		return redirect(303, '/auth/login');
	}
};
