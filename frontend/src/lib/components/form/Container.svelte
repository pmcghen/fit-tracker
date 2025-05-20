<script lang="ts">
	import type { ComponentType } from '$lib/types';
	import type { Snippet } from 'svelte';

	type ContainerProps = ComponentType & {
		children: Snippet;
		legend?: string;
	};
	const { children, legend, class: className }: ContainerProps = $props();
</script>

<div class="form-container {className}">
	{#if legend}
		<h2>{legend}</h2>
	{/if}
	{@render children()}
</div>

<style>
	.form-container {
		display: flex;
		flex-direction: column;
		gap: var(--size-6);
		padding: var(--size-6);
		background-color: var(--color-background);
		box-shadow: var(--shadow);
		background: #fff;
		border-radius: var(--rounded-default);

		h2 {
			margin: 0 0 var(--size-4);
			font-size: var(--scale-4);
		}
	}
</style>
