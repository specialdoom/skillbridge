<script lang="ts">
	import * as Card from "$components/card";

	let { data } = $props();
</script>

<div class="flex flex-1 flex-col gap-4 p-4">
	<div class="grid auto-rows-min gap-4 md:grid-cols-3">
		<div class="bg-muted/50 flex aspect-video flex-col gap-4 rounded-xl p-4">
			Registered events
			{#each data.registeredEvents as registeredEvent}
				<Card.Root>
					<Card.Header>
						<Card.Title>{registeredEvent.name}</Card.Title>
						<Card.Description>
							{registeredEvent.startDate} - {registeredEvent.endDate}
						</Card.Description>
					</Card.Header>
					<Card.Content></Card.Content>
				</Card.Root>
			{:else}
				<p>You have no registered events</p>
			{/each}
		</div>
		<div class="bg-muted/50 aspect-video rounded-xl">Tasks</div>
		<div class="bg-muted/50 aspect-video rounded-xl">
			New volunteers
			{#each data.newVolunteers as newVolunteer, i (i)}
				<p>{newVolunteer.firstName} {newVolunteer.lastName}</p>
			{/each}
		</div>
	</div>
	<div class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"></div>
</div>
