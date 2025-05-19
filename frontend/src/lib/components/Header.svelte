<script lang="ts">
	import { enhance } from '$app/forms';

	type HeaderProps = {
		user?: {
			name?: string | null;
		} | null;
	};
	const { user }: HeaderProps = $props();
</script>

<header>
	<a href="/">Home</a>
	{#if user}
		<form action="/auth" method="POST" use:enhance>
			<button type="submit">Log out</button>
		</form>
	{:else}
		<a href="/auth/login">Log in</a>
	{/if}
	{#if user}
		Welcome {user.name}!
	{/if}
</header>
