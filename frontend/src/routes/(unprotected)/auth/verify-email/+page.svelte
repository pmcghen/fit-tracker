<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, FormContainer, Input, Message } from '$components';

	const { form } = $props();
</script>

<form
	method="POST"
	action="?/verify"
	use:enhance={() => {
		return ({ update, result }) => {
			console.log(result);
			if (result?.type === 'success') {
				// Handle success, e.g., redirect to a different page
				setTimeout(() => {
					window.location.href = '/';
				}, 2000);
			}

			update();
		};
	}}
>
	<FormContainer legend="Verify Email">
		{#if form}
			{#if form?.success}
				<Message type="success">{form?.message}</Message>
			{:else}
				<Message type="error">{form?.message}</Message>
			{/if}
		{/if}
		<div>
			<p>
				Please check your email for a verification code. If you haven't received it, please check
				your spam folder. If you still can't find it, you can request a new code.
			</p>
			<p>
				<strong>The code will expire in 10 minutes.</strong>
			</p>
		</div>
		<Input
			id="code"
			type="text"
			name="code"
			label="Code"
			placeholder="Enter the verification code"
			required
		/>
		<section class="actions">
			<Button type="submit">Verify</Button>
			<Button type="submit" formaction="?/resend">Resend Code</Button>
		</section></FormContainer
	>
</form>
