<script lang="ts">
	import * as Table from "$components/table";
	import CircleDashed from "lucide-svelte/icons/circle-dashed";
	import * as Card from "$components/card";
	import * as Avatar from "$components/avatar";
	import { Button } from "$components/button";
	import CircleCheck from "lucide-svelte/icons/circle-check";
	import CircleX from "lucide-svelte/icons/circle-x";
	import { enhance } from "$app/forms";

	let { data } = $props();
</script>

<div
	class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3"
>
	<div class="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
		<Card.Root>
			<Card.Header>
				<Card.Title>Registered volunteers</Card.Title>
				<Card.Description>Manage your registered volunteers to the event.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>First & Last Name</Table.Head>
							<Table.Head>Actions</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data.registrations as registration, i (i)}
							<Table.Row>
								<Table.Cell>{registration.firstName} {registration.lastName}</Table.Cell>
								<Table.Cell>Coming soon</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>
	</div>
	<div>
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-4">
					<CircleDashed />Pending registrations
				</Card.Title>
				<Card.Description>ADD DESCRIPTION</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-6">
				{#each data.pendingRegistrations as registration, i (i)}
					<div class="flex items-center justify-between space-x-4">
						<div class="flex items-center space-x-4">
							<Avatar.Root>
								<Avatar.Image
									src="avatar1.png"
									alt="{registration.firstName} {registration.lastName}"
								/>
								<Avatar.Fallback>UU</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<p class="text-sm font-medium leading-none">
									{registration.firstName}
									{registration.lastName}
								</p>
								<p class="text-muted-foreground text-sm">{registration.email}</p>
							</div>
						</div>
						<div class="flex gap-2">
							<form method="POST" action="?/update" use:enhance>
								<input type="hidden" name="registrationId" value={registration.id} />
								<input type="hidden" name="status" value="approve" />
								<Button variant="outline" size="icon" type="submit">
									<CircleCheck />
								</Button>
							</form>
							<form method="POST" action="?/update" use:enhance>
								<input type="hidden" name="registrationId" value={registration.id} />
								<input type="hidden" name="status" value="rejected" />
								<Button variant="outline" size="icon" type="submit">
									<CircleX />
								</Button>
							</form>
						</div>
					</div>
				{/each}
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center gap-4">
					<CircleX />Rejected registrations
				</Card.Title>
				<Card.Description>ADD DESCRIPTION</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-6">
				{#each data.rejectedRegistrations as registration, i (i)}
					<div class="flex items-center justify-between space-x-4">
						<div class="flex items-center space-x-4">
							<Avatar.Root>
								<Avatar.Image
									src="avatar1.png"
									alt="{registration.firstName} {registration.lastName}"
								/>
								<Avatar.Fallback>UU</Avatar.Fallback>
							</Avatar.Root>
							<div>
								<p class="text-sm font-medium leading-none">
									{registration.firstName}
									{registration.lastName}
								</p>
								<p class="text-muted-foreground text-sm">{registration.email}</p>
							</div>
						</div>
					</div>
				{/each}
			</Card.Content>
		</Card.Root>
	</div>
</div>
