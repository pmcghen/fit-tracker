<script lang="ts">
	import type { User } from '$db/schema';
	import { DashboardIcon, LockerIcon, SettingsIcon } from '$lib/assets/icons';

	type DashboardProps = {
		user: Partial<User>;
	};

	const { user }: DashboardProps = $props();
</script>

<div class="container container-xl">
	<div class="dashboardContainer">
		<aside>
			<div class="dashboardContainer__profile">
				<span class="profileImg">
					{user?.name?.charAt(0).toUpperCase() ?? '?'}
				</span>
				<h2>{user?.name ?? '?'}</h2>
			</div>
			<nav class="dashboardContainer__nav">
				<a href="/dashboard" class="active">
					<DashboardIcon class="dashboardIcon" />
					<span>Dashboard</span>
				</a>
				<a href="/dashboard/activities">
					<LockerIcon class="lockerIcon" />
					<span>Gear Room</span>
				</a>
				<a href="/dashboard/activities/new">
					<SettingsIcon class="settingsIcon" />
					<span>Settings</span>
				</a>
			</nav>
		</aside>
		<div class="dashboardContainer__content"></div>
	</div>
</div>

<style>
	.dashboardContainer {
		display: flex;
		width: 100%;
		gap: var(--size-5);

		& .dashboardContainer__content {
			flex: 1;
			background-color: var(--color-red-200);
			padding: var(--size-5);
		}
		aside {
			width: 350px;
			background: #fff;
			border-radius: var(--rounded-default);
			box-shadow: var(--shadow);
		}
		& .dashboardContainer__profile {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			position: relative;
			padding: var(--size-5);
			padding-top: calc((75px / 2) + var(--size-3));
		}

		& .dashboardContainer__profile h2 {
			text-align: center;
			margin: 0;
		}

		.profileImg {
			width: 75px;
			height: 75px;
			background-color: var(--color-primary);
			color: var(--color-white);
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			font-size: var(--scale-4);
			font-family: var(--font-display);
			position: absolute;
			top: 0;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		.dashboardContainer__nav {
			width: 100%;
			display: flex;
			flex-direction: column;

			a {
				display: flex;
				align-items: center;
				gap: var(--size-4);
				padding: var(--size-3) var(--size-4);
				text-decoration: none;
				transition: all 150ms var(--ease-in-out-quad);
				color: var(--color-gray-700);

				:global(svg) {
					width: 20px;
					transition: all 150ms var(--ease-in-out-quad);
				}
				:global(.lockerIcon) {
					stroke: var(--color-grey-700);
					stroke-width: 2px;
					fill: transparent;
				}

				:global(.dashboardIcon path) {
					transition: all 150ms var(--ease-in-out-quad);
				}

				:global(.settingsIcon path) {
					fill: var(--color-grey-700);
					stroke: var(--color-grey-700);
					transition: all 150ms var(--ease-in-out-quad);
				}

				&:hover,
				&:focus,
				&.active {
					background-color: var(--color-primary);
					color: var(--color-white);

					:global(.lockerIcon) {
						stroke: #fff;
					}

					:global(.dashboardIcon path) {
						stroke: var(--color-white);
					}

					:global(.settingsIcon path) {
						fill: var(--color-white);
						stroke: var(--color-white);
					}
				}

				&:last-child {
					border-radius: 0 0 var(--rounded-default) var(--rounded-default);
				}
			}
		}
	}
</style>
