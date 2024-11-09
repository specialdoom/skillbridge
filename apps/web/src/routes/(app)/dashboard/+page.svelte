<script lang="ts">
	import * as Card from "$components/card";

	let { data } = $props();
</script>

<div class="flex flex-1 flex-col gap-4 p-4">
	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="bg-muted/50 flex aspect-video flex-col gap-4 rounded-xl p-4">
			{#each data.registeredEvents as registeredEvent}
				<Card.Root class="w-[350px]">
					<Card.Header>
						<Card.Title>{registeredEvent.name}</Card.Title>
						<Card.Description
							>{registeredEvent.startDate} - {registeredEvent.endDate}</Card.Description
						>
					</Card.Header>
					<Card.Content>Content</Card.Content>
					<Card.Footer class="flex justify-between">Footer</Card.Footer>
				</Card.Root>
				<div class="rounded-xl bg-white p-6">
					<div class="mb-3 flex items-center justify-between">
						<div class="flex items-center gap-2.5">
							<span class="h-2.5 w-2.5 rounded-full bg-purple-600"></span>
							<p class="text-base font-medium text-gray-900">
								{registeredEvent.startDate} - {registeredEvent.endDate}
							</p>
						</div>
					</div>
					<h6 class="mb-1 text-xl font-semibold leading-8 text-black">{registeredEvent.name}</h6>
				</div>
			{:else}
				<p>You have no registered events</p>
			{/each}
		</div>
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
		<div class="bg-muted/50 aspect-video rounded-xl"></div>
	</div>
	<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
</div>
