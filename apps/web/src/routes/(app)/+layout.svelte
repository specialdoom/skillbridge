<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { writable } from "svelte/store";
	import { Avatar, Button, ThemeSwitcher } from "@skillbridge/kampsy-ui";
	import { goto } from "$app/navigation";

	const { data, children }: { children: Snippet; data: LayoutData } = $props();
	const user = writable(data.user);

	$effect.pre(() => {
		user.set(data.user);
	});

	setContext("user", user);

	async function logout() {
		await goto("/logout");
	}
</script>

<div class="min-h-vh bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary">
	<header class="bg-kui-light-bg dark:bg-kui-dark-bg flex h-16 w-full justify-between p-4">
		<a class="flex items-center gap-2" href="/">
			<img src="icon.png" class="h-[40px]" alt="logo" />
			<span class="geist-mono-400">skillbridge</span>
		</a>
		<nav class="flex w-fit gap-4">
			<ThemeSwitcher />
			<div class="w-max-[200px] flex w-fit items-center gap-2">
				<Avatar placeholder />
				{$user.firstName}
				{$user.lastName}
			</div>
			<Button size="small" rounded onclick={logout}>Logout</Button>
		</nav>
	</header>
	<nav
		class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 flex h-12 w-full border-b"
	>
		<div class="flex h-full w-full items-center gap-4 px-4">
			<a
				href="/dashboard"
				class="text-kui-light-gray-1000 dark:text-kui-dark-gray-1000 bg-kui-light-gray-alpha-400 dark:bg-kui-dark-gray-alpha-400 hover:bg-kui-light-gray-300 dark:hover:bg-kui-dark-gray-300 flex items-center justify-center gap-x-[6px] rounded-md px-1.5
            py-1 text-xs transition-all">Dashboard</a
			>
			<a
				href="/events"
				class="text-kui-light-gray-1000 dark:text-kui-dark-gray-1000 bg-kui-light-gray-alpha-400 dark:bg-kui-dark-gray-alpha-400 hover:bg-kui-light-gray-300 dark:hover:bg-kui-dark-gray-300 flex items-center justify-center gap-x-[6px] rounded-md px-1.5
            py-1 text-xs transition-all">Events</a
			>
			<a
				href="/profile"
				class="text-kui-light-gray-1000 dark:text-kui-dark-gray-1000 bg-kui-light-gray-alpha-400 dark:bg-kui-dark-gray-alpha-400 hover:bg-kui-light-gray-300 dark:hover:bg-kui-dark-gray-300 flex items-center justify-center gap-x-[6px] rounded-md px-1.5
            py-1 text-xs transition-all">Settings</a
			>
		</div>
	</nav>
	<main>
		{@render children()}
	</main>
</div>
