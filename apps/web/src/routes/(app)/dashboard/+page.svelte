<script lang="ts">
	import { SearchInput, Switch } from "kampsy-ui";
	let { data } = $props();
</script>

<div
	class="flex max-w-[1220px] flex-col pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<div class="flex gap-2">
		<div class="w-2/3">
			<SearchInput placeholder="Search registered events" />
		</div>

		<Switch.Root value="not" name="default">
			<Switch.Control defaultChecked label="Don't include old" value="not" />
			<Switch.Control label="Include old" value="include" />
		</Switch.Root>
	</div>

	Display event grid
</div>
