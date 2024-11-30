<script lang="ts">
	import { setContext, type Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { writable } from "svelte/store";
	import { Button, Menu, Tabs, ThemeSwitcher } from "kampsy-ui";
	import { MoreHorizontal } from "kampsy-ui/icons";

	const { data, children }: { children: Snippet; data: LayoutData } = $props();
	const user = writable(data.user);

	$effect.pre(() => {
		user.set(data.user);
	});

	setContext("user", user);
</script>

<div class="min-h-vh bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary">
	<header class="bg-kui-light-bg dark:bg-kui-dark-bg flex h-16 w-full justify-between p-4">
		<a class="flex items-center gap-2" href="/">
			<img src="icon.png" class="h-[40px]" alt="logo" />
			<span class="geist-mono-400">skillbridge</span>
		</a>
		<nav class="flex w-fit gap-4">
			<ThemeSwitcher />
			<Menu.Root alignment="right">
				<Menu.Button aria-label="Menu" shape="square" size="small" type="secondary">
					<div class="h-[16px] w-[16px]">
						<MoreHorizontal />
					</div>
				</Menu.Button>
				<Menu.Content class="w-[200px]">
					<Menu.Link href="/profile">Profile</Menu.Link>
					<hr class="my-2" />
					<Menu.Link href="/logout">Logout</Menu.Link>
				</Menu.Content>
			</Menu.Root>
		</nav>
	</header>
	<nav
		class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 flex h-12 w-full border-b "
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
