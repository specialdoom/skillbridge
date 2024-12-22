<script lang="ts">
	import { Input } from "$components/input/index.js";

	let { data } = $props();
</script>

<div
	class="flex max-w-[1220px] flex-col gap-6 pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<div class="flex items-center gap-2">
		<Input placeholder="Search registered events (Coming soon...)" disabled />
	</div>

	<section class="grid">
		{#each data.registeredEvents as event}
			<div
				class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 overflow-hidden rounded-xl border"
			>
				<div class="flex w-full flex-col gap-2 gap-4 overflow-x-auto p-4 lg:p-6">
					{event.name}
				</div>
			</div>
		{/each}
	</section>
</div>

<style>
	.grid {
		display: grid;
		grid-gap: 8px;
		grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
	}
</style>
