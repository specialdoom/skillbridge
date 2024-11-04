<script lang="ts">
	import { Button } from "$components/button";
	import * as Card from "$components/card";
	import { Input } from "$components/input";
	import { Label } from "$components/label";
	import CircleAlert from "lucide-svelte/icons/circle-alert";
	import * as Alert from "$components/alert";

	let { form } = $props();
</script>

<div class="flex h-screen w-full items-center justify-center px-4">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-2xl">Login</Card.Title>
			<Card.Description>Enter your email below to login to your account</Card.Description>
			{#if form?.error}
				<Alert.Root variant="destructive">
					<CircleAlert class="size-4" />
					<Alert.Description>{form.error}</Alert.Description>
				</Alert.Root>
			{/if}
		</Card.Header>
		<Card.Content>
			<form class="grid gap-4" method="POST">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input id="email" type="email" placeholder="m@example.com" required name="email" />
				</div>
				<div class="grid gap-2">
					<div class="flex items-center">
						<Label for="password">Password</Label>
						<a href="##" class="ml-auto inline-block text-sm underline"> Forgot your password? </a>
					</div>
					<Input id="password" type="password" required name="password" />
				</div>
				<Button type="submit" class="w-full">Login</Button>
				<Button variant="outline" class="w-full" disabled>Login with Google (Coming soon)</Button>
			</form>
			<div class="mt-4 text-center text-sm">
				Are you a volunteer?
				<a href="/register/volunteer" class="underline"> Register here</a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
