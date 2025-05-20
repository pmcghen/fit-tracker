<script lang="ts">
	import './auth.css';

	const { children } = $props();
</script>

<div class="authentication-container">
	<div class="container container-sm">
		{@render children()}
	</div>
</div>
