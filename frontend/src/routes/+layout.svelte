<svelte:head>
	<title>Fit Tracker</title>
</svelte:head>

<header>
	<a href="/">Home</a>
	<a href="/login">Log in</a>
</header>

<main>
	<slot />
</main>

<footer>
	© {new Date().getFullYear()}
</footer>
