<script lang="ts">
	import * as Breadcrumb from '$components/breadcrumb';
	import { Separator } from '$components/separator';
	import * as Sidebar from '$components/sidebar';
	import AppSidebar from '$components/app-sidebar/app-sidebar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import ModeSwitcher from '$components/mode-switcher/mode-switcher.svelte';
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	const { data, children }: { children: Snippet; data: LayoutData } = $props();
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
						<Breadcrumb.Item class="hidden md:block">
							<Breadcrumb.Link href="/dashboard">Dashboard</Breadcrumb.Link>
						</Breadcrumb.Item>
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
