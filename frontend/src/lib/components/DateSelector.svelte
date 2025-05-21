<script lang="ts">
	import {
		addDays,
		addMonths,
		getDate,
		isSameDay,
		startOfMonth,
		startOfWeek,
		subMonths
	} from 'date-fns';
	import { onMount } from 'svelte';

	let currentDate = new Date();
	let selectedDate: Date = new Date();
	let days: Date[] = [];

	const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const monthLabels = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	function generateCalendar(date: Date) {
		const startMonth = startOfMonth(date);
		const startDay = startOfWeek(startMonth, { weekStartsOn: 0 }); // Monday

		const start = getDate(date);
		const end = getDate(date) + 7;
		days = [];

		for (let i = start; i < end; i++) {
			days.push(addDays(startDay, i));
		}
	}

	function prevMonth() {
		currentDate = subMonths(currentDate, 1);
		generateCalendar(currentDate);
	}

	function nextMonth() {
		currentDate = addMonths(currentDate, 1);
		generateCalendar(currentDate);
	}

	function selectDate(date: Date) {
		selectedDate = date;
	}

	onMount(() => {
		generateCalendar(currentDate);
	});
</script>

<div class="calendar">
	<div class="header">
		<div>
			<button class="monthSelector">
				{monthLabels[currentDate.getMonth()]}
				<svg
					viewBox="0 0 10 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					role="img"
				>
					<path
						d="M9 7L5 11L1 7M9 1L5 5L1 1"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</div>
		<div class="actions">
			<button>
				<svg viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1 1L4 4L1 7"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="sr-only">Previous day</span>
			</button>
			<button disabled={true}>
				<svg viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M1 1L4 4L1 7"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
				<span class="sr-only">Next day</span>
			</button>
		</div>
		<!-- {#each monthLabels as month, index}
				<option value={index} selected={index === currentDate.getMonth()}>
					{month}
				</option>
			{/each} -->
	</div>

	<div class="day-labels">
		{#each dayLabels as label}
			<div>{label}</div>
		{/each}
	</div>

	<div class="day-grid">
		{#each days as day}
			<div class="day">
				<button
					class="dayBtn"
					class:active={isSameDay(day, selectedDate)}
					onclick={() => selectDate(day)}>{getDate(day)}</button
				>
			</div>
			<!-- <div
				class="day {isSameDay(day, selectedDate) ? 'selected' : ''} {isSameMonth(day, currentDate)
					? ''
					: 'outside'}"
				on:click={() => selectDate(day)}
			>
				{getDate(day)}
			</div> -->
		{/each}
	</div>
</div>

<style>
	.calendar {
		border-radius: var(--rounded-default);
		background: #fff;
		box-shadow: var(--shadow);
	}
	.header {
		display: flex;
		align-items: center;
		padding: var(--size-4);
		margin-bottom: var(--size-4);
	}
	.day-labels,
	.day-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: var(--space-2);
		text-align: center;
	}

	.day-labels {
		font-weight: 600;
		margin-bottom: var(--size-2);
	}
	.day {
		padding: var(--size-2);
	}

	.dayBtn {
		padding: var(--size-3);
		border-radius: 50%;
		border: 0;
		background: transparent;
		transition: all 130ms var(--ease-in-out-cubic);
		cursor: pointer;

		&:hover,
		&:focus {
			background: var(--color-grey-100);
		}

		&.active {
			background: var(--color-primary);
			color: var(--color-white);
			pointer-events: none;
		}
	}

	.actions {
		margin-left: auto;
		display: flex;

		button {
			line-height: 0;
			border: 0;
			background: transparent;
			cursor: pointer;
			transition: color 100ms var(--ease-in-out-quad);
			padding: var(--size-2);

			&:hover,
			&:focus {
				svg path {
					stroke: var(--color-primary);
				}
			}

			svg {
				width: 10px;
			}

			&[disabled] {
				pointer-events: none;
				opacity: 0.3;
			}

			&:nth-child(1) {
				transform: rotate(180deg);
			}
		}

		svg path {
			stroke: var(--color-grey-700);
			transition: all 150ms var(--ease-in-out-quad);
		}
	}
	.monthSelector {
		padding: var(--size-2) var(--size-4);
		background: var(--color-grey-200);
		min-width: 200px;
		border-radius: 2rem;
		box-shadow: var(--shadow);
		display: flex;
		transition: all 150ms var(--ease-in-out-quad);
		border: 0;
		cursor: pointer;

		&:hover,
		&:focus {
			background: var(--color-grey-300);
		}

		svg {
			pointer-events: none;
			margin-left: auto;
			width: 9px;
			path {
				stroke: var(--color-grey-700);
			}
		}
	}
</style>
