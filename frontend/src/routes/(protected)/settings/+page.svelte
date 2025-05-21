<script lang="ts">
	import { Dashboard } from '$components';

	const { data } = $props();
</script>

<Dashboard user={data.user}>
	<h1>Settings</h1>
</Dashboard>
