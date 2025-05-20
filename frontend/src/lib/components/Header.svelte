<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$components';
	import { Logo } from '$lib/assets/icons';

	type HeaderProps = {
		user?: {
			name?: string | null;
		} | null;
	};
	const { user }: HeaderProps = $props();
</script>

<header class="header">
	<div class="container">
		<Logo class="logo" />
		<nav class="main">
			<a href="/" class:active={true}>Home</a>
			<a href="/">About</a>
			<a href="/">FAQ</a>
			{#if !user}
				<a href="/auth/login">Log in</a>
			{/if}
		</nav>
		{#if user}
			<div class="user">
				<form action="/auth" method="POST" use:enhance>
					<Button type="submit" variant="secondary">Log out</Button>
				</form>
				<div class="profile">
					<span class="avatar">
						{#if user.name}
							{user.name[0].toUpperCase()}
						{:else}
							?
						{/if}
					</span>
				</div>
			</div>
		{/if}
	</div>
</header>

<style>
	.header {
		display: flex;
		align-items: center;
		width: 100%;
		padding: var(--size-5);
		gap: var(--size-5);
		margin-bottom: var(--size-9);

		.container {
			display: flex;
			align-items: center;
			width: 100%;
			max-width: var(--max-width);
			margin: 0 auto;
			gap: var(--size-5);
		}

		:global(.logo) {
			width: 50px;
		}

		.user {
			display: flex;
			align-items: center;
			gap: var(--size-5);

			.profile {
				display: flex;
				align-items: center;
				gap: var(--size-3);
			}

			.avatar {
				display: block;
				width: 40px;
				height: 40px;
				background-color: var(--color-grey-300);
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 9999px;
				font-family: var(--font-display);
				font-size: var(--scale-3);
			}
		}

		.main {
			flex: 1;
			display: flex;
			justify-content: center;
			gap: var(--size-7);

			a {
				font-size: var(--scale-4);
				font-family: var(--font-display);
				letter-spacing: 0.15rem;
				text-transform: uppercase;
				color: var(--color-grey-700);
				text-decoration: none;
				transition: color 200ms var(--ease-in-out-cubic);

				&:hover,
				&.active,
				&:focus {
					color: var(--color-primary);
				}
			}
		}
	}
</style>
