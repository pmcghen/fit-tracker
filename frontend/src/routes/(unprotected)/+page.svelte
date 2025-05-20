<script lang="ts">
	import { Dashboard } from '$components';

	const { data } = $props();
</script>

{#if data.user}
	<Dashboard user={data.user} />
{:else}
	<h1>Welcome to Fit Tracker</h1>
	<p>
		Fit Tracker is an open source alternative to Strava. We're here to help you focus on your
		fitness goals without subjecting you to mandatory, half baked AI features.
	</p>
{/if}
