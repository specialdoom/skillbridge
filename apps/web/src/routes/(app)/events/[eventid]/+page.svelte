<script lang="ts">
	import * as Table from "$lib/components/ui/table/index.js";

	let { data } = $props();
</script>

<Table.Root>
	<Table.Caption>Registrations for event</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>First & Last Name</Table.Head>
			<Table.Head>Status</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.registrations as registration, i (i)}
			<Table.Row>
				<Table.Cell>{registration.firstName} {registration.lastName}</Table.Cell>
				<Table.Cell>{registration.status}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
