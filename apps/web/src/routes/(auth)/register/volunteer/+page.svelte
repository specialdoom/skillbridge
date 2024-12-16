<script lang="ts">
	import { enhance } from "$app/forms";
	import { Text, Note, Button, Input } from "@skillbridge/kampsy-ui";

	let { form } = $props();
	let formRef: HTMLFormElement | null = $state(null);
</script>

<form class="grid h-fit w-1/3 gap-4" method="POST" bind:this={formRef} use:enhance>
	<Text size={32}>Register as volunteer</Text>
	{#if form?.error}
		<Note fill type="error">{form.error}.</Note>
	{/if}
	<div class="grid gap-2">
		<Input id="email" type="email" placeholder="Email" name="email" />
	</div>
	<div class="grid gap-2">
		<Input id="firstName" placeholder="First name" name="firstName" />
	</div>
	<div class="grid gap-2">
		<Input id="lastName" placeholder="Last name" name="lastName" />
	</div>
	<div class="grid grid-cols-2 gap-2">
		<Input id="password" type="password" placeholder="Password" name="password" />
		<Input
			id="confirmPassword"
			type="password"
			placeholder="Confirm password"
			name="confirmPassword"
		/>
	</div>
	<Button onclick={() => formRef?.requestSubmit()}>Register</Button>
</form>
