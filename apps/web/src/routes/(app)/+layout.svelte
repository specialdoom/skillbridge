<script lang="ts">
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<div>
	<aside></aside>
	<main>{@render children()}</main>
	<aside></aside>
</div>
