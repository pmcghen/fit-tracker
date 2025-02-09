<script lang="ts">
</script>

<form>
	<fieldset>
		<legend>Log in to Fit Tracker</legend>
		<ul>
			<li>
				<label for="username">User name:</label>
				<input id="username" name="username" required />
			</li>
			<li>
				<label for="password">Password:</label>
				<input type="password" id="password" name="password" required />
			</li>
		</ul>
	</fieldset>
	<section>
		<button id="submit" type="submit">Log in</button>
		<p>Or <a href="/login">log in</a> if you already have an account.</p>
	</section>
</form>
