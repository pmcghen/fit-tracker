<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();
</script>

{#if !form?.success}
	<p class="error">{form?.message}</p>
{/if}

<form method="POST" action="/auth/register" use:enhance>
	<fieldset>
		<legend>Register for Fit Tracker</legend>
		<ul>
			<li>
				<label for="email">Email:</label>
				<input type="email" id="email" name="email" required />
			</li>
			<li>
				<label for="name">Name:</label>
				<input type="text" id="name" name="name" required />
			</li>
			<li>
				<label for="password">Password:</label>
				<input type="password" id="password" name="password" required />
			</li>
			<li>
				<label for="confirm_password">Confirm Password:</label>
				<input type="password" id="confirm_password" name="confirm_password" required />
			</li>
		</ul>
	</fieldset>
	<section>
		<button id="submit" type="submit">Register</button>
		<p>Or <a href="/auth/login">log in</a> if you already have an account.</p>
	</section>
</form>
