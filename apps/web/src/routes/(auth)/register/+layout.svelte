<script lang="ts">
	let { children } = $props();
</script>

<div class="h-full w-full">
	<div class="flex h-[calc(100%-100px)] w-full items-center justify-center">
		{@render children()}
	</div>
	<div class="flex h-[100px] w-full flex-col items-center justify-center border-t p-4">
		<div>
			Already registered? Authenticate <a href="/login" class="underline"> here </a>.
		</div>
	</div>
</div>
