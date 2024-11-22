<script lang="ts">
	import * as Card from "$components/card";
	import { Input } from "$components/input";
	import { Label } from "$components/label";
	import { Button } from "$components/button";
	import * as Alert from "$components/alert";
	import CircleAlert from "lucide-svelte/icons/circle-alert";
	import { enhance } from "$app/forms";

	let { data, form } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Profile settings</Card.Title>
	</Card.Header>
	<Card.Content>
		{#if form?.error}
			<Alert.Root variant="destructive">
				<CircleAlert class="size-4" />
				<Alert.Description>{form.error}</Alert.Description>
			</Alert.Root>
		{/if}
		<form class="space-y-8" method="POST" use:enhance>
			<div class="grid gap-2">
				<Label for="email">Email</Label>
				<Input id="email" type="email" name="email" readonly value={data.user.email} />
			</div>
			<div class="grid gap-2">
				<Label for="firstName">First name</Label>
				<Input id="firstName" type="text" name="firstName" value={data.user.firstName} />
			</div>
			<div class="grid gap-2">
				<Label for="lastName">Last name</Label>
				<Input id="lastName" type="text" name="lastName" value={data.user.lastName} />
			</div>
			<Button type="submit">Update</Button>
		</form>
	</Card.Content>
</Card.Root>
