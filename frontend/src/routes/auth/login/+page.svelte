<script lang="ts">
	import { enhance } from '$app/forms';

	const { form } = $props();
</script>

{#if !form?.success}
	<p class="error">{form?.message}</p>
{/if}

<form method="POST" action="/auth/login" use:enhance>
	<fieldset>
		<legend>Log in to Fit Tracker</legend>
		<ul>
			<li>
				<label for="email">Email:</label>
				<input id="email" name="email" type="email" required />
			</li>
			<li>
				<label for="password">Password:</label>
				<input type="password" id="password" name="password" required />
			</li>
		</ul>
	</fieldset>
	<section>
		<button id="submit" type="submit">Log in</button>
		<p>Or <a href="/auth/register">register</a> for an account.</p>
	</section>
</form>
