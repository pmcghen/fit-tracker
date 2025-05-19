<script lang="ts">
	import { enhance } from '$app/forms';
	import { Message } from '$components';
	import Button from '$components/Button.svelte';
	import { FormContainer, Input } from '$components/form';

	const { form } = $props();
</script>

<form method="POST" action="/auth/login" use:enhance>
	<FormContainer legend="Log in to Fit Tracker">
		{#if form}
			{#if form?.success}
				<Message type="success">{form?.message}</Message>
			{:else}
				<Message type="error">{form?.message}</Message>
			{/if}
		{/if}
		<Input type="email" name="email" id="email" label="Email" required />
		<Input type="password" name="password" id="password" label="Password" required />
		<section class="actions">
			<Button type="submit" class="primary">Login</Button>
			<p>Or <a href="/auth/register">register</a> for an account.</p>
		</section>
	</FormContainer>
</form>
