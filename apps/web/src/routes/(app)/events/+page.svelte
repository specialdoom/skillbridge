<script>
	import { enhance } from "$app/forms";
	import * as Alert from "$components/alert";
	import { Button } from "$components/button";
	import CalendarGrid from "$components/calendar-grid/calendar-grid.svelte";
	import * as Dialog from "$components/dialog";
	import { Input } from "$components/input";
	import { Label } from "$components/label";
	import CircleAlert from "lucide-svelte/icons/circle-alert";

	let { data, form } = $props();

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger><Button>Add event</Button></Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				<form
					class="grid gap-4"
					method="POST"
					use:enhance={() => {
						return async ({ result }) => {
							if (result.type === "success") {
								open = false;
							}
						};
					}}
				>
					{#if form?.error}
						<Alert.Root variant="destructive">
							<CircleAlert class="size-4" />
							<Alert.Description>{form.error}</Alert.Description>
						</Alert.Root>
					{/if}
					<div class="grid gap-2">
						<select name="organizationId">
							{#each data.organizations as organization}
								<option value={organization.id}>{organization.name}</option>
							{/each}
						</select>
					</div>
					<div class="grid gap-2">
						<Label for="name">Name</Label>
						<Input id="name" type="text" name="name" />
					</div>
					<div class="grid gap-2">
						<Label for="startDate">Start date</Label>
						<input type="date" name="startDate" />
					</div>
					<div class="grid gap-2">
						<Label for="endDate">End date</Label>
						<input type="date" name="endDate" />
					</div>
					<Button type="submit" class="w-full">Add event</Button>
					<Button variant="outline" class="w-full">Cancel</Button>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

<CalendarGrid events={data.events} />
