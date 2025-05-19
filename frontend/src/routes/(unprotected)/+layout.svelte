<script lang="ts">
	import { enhance } from '$app/forms';
	import '../../app.css';

	const { children, data } = $props();
	const { user } = $derived(data);
</script>

<svelte:head>
	<title>Fit Tracker</title>
</svelte:head>

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
		Welcome {user.name} - {user.confirmed ? 'Yes' : 'No'}!
	{/if}
</header>

<main>
	{@render children()}
</main>

<footer>
	© {new Date().getFullYear()}
</footer>
