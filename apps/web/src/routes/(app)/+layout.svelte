<script lang="ts">
	import * as Breadcrumb from "$components/breadcrumb";
	import { Separator } from "$components/separator";
	import * as Sidebar from "$components/sidebar";
	import AppSidebar from "$components/app-sidebar/app-sidebar.svelte";
	import { ModeWatcher } from "mode-watcher";
	import ModeSwitcher from "$components/mode-switcher/mode-switcher.svelte";
	import { setContext, type Snippet } from "svelte";
	import type { LayoutData } from "./$types";
	import { page } from "$app/stores";
	import { writable } from "svelte/store";

	const { data, children }: { children: Snippet; data: LayoutData } = $props();

	let breadcrumbs = $derived($page.url.pathname.split("/").filter((x) => x !== ""));

	const user = writable(data.user);
	$effect.pre(() => {
		user.set(data.user);
	});

	setContext("user", user);
</script>

<ModeWatcher />

<Sidebar.Provider>
	<AppSidebar user={data.user} />
	<Sidebar.Inset>
		<header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
				<Separator orientation="vertical" class="mr-2 h-4" />
				<Breadcrumb.Root>
					<Breadcrumb.List>
						{#each breadcrumbs as breadcrumb, i}
							<Breadcrumb.Item class="hidden md:block">
								<Breadcrumb.Link href="/{breadcrumb}">{breadcrumb}</Breadcrumb.Link>
							</Breadcrumb.Item>
							{#if i !== breadcrumbs.length - 1}
								<Breadcrumb.Separator />
							{/if}
						{/each}
					</Breadcrumb.List>
				</Breadcrumb.Root>
				<Separator orientation="vertical" class="mr-2 h-4" />
				<ModeSwitcher />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
