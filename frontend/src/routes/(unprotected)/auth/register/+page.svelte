<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, FormContainer, Input, Message } from '$components';

	const { form } = $props();
</script>

<form method="POST" action="/auth/register" use:enhance>
	<FormContainer legend="Register for Fit Tracker">
		{#if form}
			{#if form?.success}
				<Message type="success">{form?.message}</Message>
			{:else}
				<Message type="error">{form?.message}</Message>
			{/if}
		{/if}
		<Input
			id="email"
			type="email"
			name="email"
			label="Email"
			placeholder="Enter your email"
			required
		/>
		<Input id="name" type="text" name="name" label="Name" placeholder="Enter your name" required />
		<Input
			id="password"
			type="password"
			name="password"
			label="Password"
			placeholder="Enter your password"
			required
		/>
		<Input
			id="confirm_password"
			type="password"
			name="confirm_password"
			label="Confirm Password"
			placeholder="Re-enter your password"
			required
		/>

		<section class="actions">
			<Button type="submit">Register</Button>
			<p>Or <a href="/auth/login">log in</a> if you already have an account.</p>
		</section>
	</FormContainer>
</form>
