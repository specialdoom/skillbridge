<script lang="ts">
	import { enhance } from "$app/forms";
	import { Input, Button, Text, Note } from "@skillbridge/kampsy-ui";
	import { LogoFacebook } from "@skillbridge/kampsy-ui/icons";

	let { form } = $props();
	let formRef: HTMLFormElement | null = $state(null);
</script>

<div class="h-full w-full">
	<div class="flex h-[calc(100%-100px)] w-full items-center justify-center">
		<form class="grid h-fit w-1/3 gap-4" method="POST" bind:this={formRef} use:enhance>
			<Text size={32}>Login to skillbridge</Text>
			{#if form?.error}
				<Note fill type="error">{form.error}.</Note>
			{/if}
			<Button disabled prefix={LogoFacebook}>Continue with Facebook (Coming soon)</Button>
			<hr />
			<div class="grid gap-2">
				<Input id="email" type="email" placeholder="Email" name="email" />
			</div>
			<div class="grid gap-2">
				<Input id="password" type="password" placeholder="Password" name="password" />
			</div>
			<Button onclick={() => formRef?.requestSubmit()}>Login</Button>
		</form>
	</div>
	<div class="flex h-[100px] w-full flex-col items-center justify-center border-t p-4">
		<div>
			Are you a volunteer?
			<a href="/register/volunteer" class="underline"> Register here</a>
		</div>
		<div>
			Register an organization?
			<a href="/register/organization" class="underline"> Register here</a>
		</div>
	</div>
</div>
