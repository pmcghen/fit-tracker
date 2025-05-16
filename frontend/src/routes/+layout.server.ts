export const load = async ({ locals }) => {
	// locals.user is set in hooks.server.ts
	// locals.session is set in hooks.server.ts
	// locals.session is set to null if the session is invalid or expired
	// locals.user is set to null if the session is invalid or expired
	return {
		user: locals.user,
		session: locals.session
	};
};
