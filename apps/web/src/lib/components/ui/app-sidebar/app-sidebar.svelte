<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavUser from "./nav-user.svelte";
	import TeamSwitcher from "./team-switcher.svelte";
	import * as Sidebar from "$components/sidebar";
	import type { ComponentProps } from "svelte";
	import NavManager from "./nav-manager.svelte";
	import GalleryVerticalEnd from "lucide-svelte/icons/gallery-vertical-end";

	let {
		ref = $bindable(null),
		collapsible = "icon",
		user,
		...restProps
	}: ComponentProps<typeof Sidebar.Root> & { user: any } = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={[{ name: "Default", logo: GalleryVerticalEnd, plan: "Free" }]} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain />
		{#if user.role === "manager"}
			<NavManager />
		{/if}
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
