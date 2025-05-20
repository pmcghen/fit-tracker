<script lang="ts">
	import '../../app.css';

	const { children, data } = $props();
	const { user } = $derived(data);
</script>

<svelte:head>
	<title>Fit Tracker</title>
</svelte:head>

{@render children()}
