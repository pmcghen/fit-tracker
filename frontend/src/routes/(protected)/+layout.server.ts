import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
	const { user, session } = event.locals;

	if (!user || !session) {
		return redirect(302, '/auth/login');
	}
	if (!user.confirmed) {
		return redirect(302, '/auth/verify-email');
	}

	return {
		user,
		session
	};
};
