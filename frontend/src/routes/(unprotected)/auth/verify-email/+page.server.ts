import { createVerifyToken, verifyToken } from '$lib';
import { sendVerifyEmail } from '$lib/server/email';
import { fail, redirect, type Actions } from '@sveltejs/kit';

export const load = async (event) => {
	if (!event.locals.user || !event.locals.session) {
		return redirect(302, '/');
	}
	if (event.locals.user) {
		if (event.locals.user.confirmed) {
			return redirect(302, '/');
		}
	}
};

export const actions: Actions = {
	verify: async ({ locals, request }) => {
		const formData = await request.formData();
		const code = formData.get('code') as string;
		if (!locals.user || !locals.session) {
			return redirect(302, '/auth/login');
		}

		if (locals.user.confirmed) {
			return redirect(302, '/');
		}
		if (!code) {
			return fail(400, {
				message: 'Code is required',
				success: false
			});
		}
		const verified = await verifyToken(code, locals.user.id!);

		if (verified) {
			return {
				message: 'Email confirmed successfully',
				success: true
			};
		} else {
			return fail(400, {
				message: 'Invalid code',
				success: false
			});
		}
	},
	resend: async ({ locals }) => {
		if (!locals.user || !locals.session) {
			return redirect(302, '/auth/login');
		}
		try {
			const token = await createVerifyToken(locals.user.id!);
			await sendVerifyEmail(
				{
					email: locals.user.email!,
					name: locals.user.name!
				},
				token
			);
		} catch (error) {
			console.error('Error sending verification email:', error);
			return fail(400, {
				message: 'Error sending verification email',
				success: false
			});
		}

		return {
			message: 'Verification code sent to your email',
			success: true
		};
	}
};
