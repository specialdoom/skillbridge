<script lang="ts">
	import { Text } from "@skillbridge/kampsy-ui";

	let { title, centered = false } = $props();
</script>

<div
	class="border-kui-light-gray-200 dark:border-kui-dark-gray-400 border-b px-6"
	class:flex={centered}
	class:items-center={centered}
	class:justify-center={centered}
>
	<div class="my-8  w-full" class:max-w-[1220px]={true}>
		<Text size={32}>{title}</Text>
	</div>
</div>
