<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();
</script>

{#if form}
	{form?.message}
{/if}

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
	<fieldset>
		<legend>Verify Email</legend>
		<p>
			Please check your email for a verification code. If you haven't received it, please check your
			spam folder. If you still can't find it, you can request a new code.
		</p>
		<p>
			<strong>The code will expire in 10 minutes.</strong>
		</p>
		<ul>
			<li>
				<label for="code">Code:</label>
				<input id="code" name="code" type="code" />
			</li>
		</ul>
		<section>
			<button id="submit" type="submit">Verify</button>
			<button formaction="?/resend">Resend Code</button>
		</section>
	</fieldset>
</form>
