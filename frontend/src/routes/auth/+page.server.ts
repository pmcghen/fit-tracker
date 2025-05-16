import { deleteSessionTokenCookie, invalidateSession } from '$lib';
import { fail, redirect, type Actions, type Load } from '@sveltejs/kit';

export const load: Load = () => {
	return redirect(307, '/auth/login');
};

export const actions: Actions = {
	default: async (event) => {
		if (event.locals.session === null) {
			return fail(401, {
				message: 'Not authenticated'
			});
		}
		invalidateSession(event.locals.session.id);
		deleteSessionTokenCookie(event);
		return redirect(302, '/auth/login');
	}
};
