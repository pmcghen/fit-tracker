import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, url }) => {
	// locals.user is set in hooks.server.ts
	// locals.session is set in hooks.server.ts
	// locals.session is set to null if the session is invalid or expired
	// locals.user is set to null if the session is invalid or expired
	if (locals.user && locals.session) {
		if (!locals.user.confirmed && !url.pathname.includes('/auth/verify-email')) {
			// If the user is not confirmed, redirect to the confirmation page
			return redirect(302, '/auth/verify-email');
		}
	}

	return {
		user: locals.user,
		session: locals.session
	};
};
