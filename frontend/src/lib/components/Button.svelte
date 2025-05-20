<script lang="ts">
	import type { ComponentType } from '$lib/types';
	import type { Snippet } from 'svelte';

	type ButtonProps = ComponentType & {
		children: Snippet;
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		href?: string;
		[key: string]: unknown;
	};
	const { children, type, disabled, href, class: className, ...rest }: ButtonProps = $props();
</script>

{#if href}
	<a class="button {className}" {href} {...rest}>
		{@render children()}
	</a>
{:else}
	<button class="button {className}" {type} {disabled} {...rest}>
		{@render children()}
	</button>
{/if}

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: var(--size-2) var(--size-3);
		border-radius: var(--rounded-default);
		background-color: var(--color-primary);
		color: var(--color-white);
		font-size: var(--scale-0);
		font-weight: 500;
		text-decoration: none;
		border: none;
		cursor: pointer;
		transition: all 120ms var(--ease-in-out-cubic);

		&:hover {
			background-color: var(--color-ofn-600);
		}

		&.disabled {
			background-color: var(--color-grey-300);
			cursor: not-allowed;
			box-shadow: none;
		}
	}
</style>
