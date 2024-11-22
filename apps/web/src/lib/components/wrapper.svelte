<script lang="ts">
	import { Text } from "kampsy-ui";

	let { title } = $props();
</script>

<div class="border-kui-light-gray-200 dark:border-kui-dark-gray-400 border-b px-6">
	<div class="my-8">
		<Text size={32}>{title}</Text>
	</div>
</div>
