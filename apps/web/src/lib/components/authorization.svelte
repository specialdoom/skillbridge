<script lang="ts">
	import { UserRole } from "$lib/shared/models/role";
	import { getContext } from "svelte";

	let { children } = $props();

	const userContext = getContext<any>("user");
</script>

{#if $userContext?.role === UserRole.Manager}
	{@render children()}
{/if}
