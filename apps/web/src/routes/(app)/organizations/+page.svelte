<script lang="ts">
	import * as Table from "$components/table";

	let { data } = $props();
</script>

<Table.Root>
	<Table.Caption>A list of your organizations.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.organizations as organization, i (i)}
			<Table.Row>
				<Table.Cell>{organization.name}</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
