<script lang="ts">
	let { form } = $props();
</script>

<form method="post">
	{#if form?.error}<p class="error">{form.error}</p>{/if}
	<label for="email">Email</label>
	<input id="email" type="email" name="email" />
	<label for="password">Password</label>
	<input id="password" type="password" name="password" />
	<label for="confirmPassword">Confirm Password</label>
	<input id="confirmPassword" type="password" name="confirmPassword" />
	<input type="submit" value="Regiser" />
	Already have an account? <a href="/login">Login</a>
</form>

<style>
	.error {
		color: red;
	}
</style>
