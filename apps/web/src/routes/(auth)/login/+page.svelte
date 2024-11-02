<script lang="ts">
	let { form } = $props();
</script>

<form method="POST">
	{#if form?.error}<p class="error">{form.error}</p>{/if}
	<label for="email">Email</label>
	<input id="email" type="email" name="email" />
	<label for="password">Password</label>
	<input id="password" type="password" name="password" />
	<input type="submit" value="Sign in" />
	Don't have an account? <a href="/register">Register</a>
</form>

<style>
	.error {
		color: red;
	}
</style>
