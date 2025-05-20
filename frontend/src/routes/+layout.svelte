<script lang="ts">
	import { Header } from '$components';

	const { children, data } = $props();
</script>

<Header user={data.user} />
<main>
	{@render children()}
</main>

<footer>
	© {new Date().getFullYear()}
</footer>
