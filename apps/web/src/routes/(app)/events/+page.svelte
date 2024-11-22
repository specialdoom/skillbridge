<script lang="ts">
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import * as Alert from "$components/alert";
	import { Button } from "$components/button";
	import CalendarGrid from "$components/calendar-grid/calendar-grid.svelte";
	import * as Dialog from "$components/dialog";
	import { Input } from "$components/input";
	import { Label } from "$components/label";
	import { UserRole } from "$lib/shared/models/role.js";
	import Calendar from "lucide-svelte/icons/calendar";
	import CircleAlert from "lucide-svelte/icons/circle-alert";
	import MapPin from "lucide-svelte/icons/map-pin";
	import { getContext } from "svelte";

	let { data, form } = $props();

	const user = getContext<any>("user");

	let open = $state(false);
	let activeEvent: any | null = $state(null);

	async function onEventClick({ event }: any) {
		if ($user.role === "manager") {
			await goto(`/events/${event.id}`);
		} else {
			open = true;
			activeEvent = data.events.find((x) => x.id === event.id);
		}
	}
</script>

{#if $user.role === "manager"}
	<Dialog.Root bind:open>
		<Dialog.Trigger><Button>Add event</Button></Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
				<Dialog.Description>
					<form
						class="grid gap-4"
						method="POST"
						action="?/add"
						use:enhance={() => {
							return async ({ result, update }) => {
								if (result.type === "success") {
									open = false;
								}

								await update();
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
							<Label for="description">Description</Label>
							<Input id="description" type="text" name="description" />
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
{/if}
{#if $user.role === UserRole.Volunteer}
	<Dialog.Root bind:open>
		<Dialog.Content class="w-full max-w-3xl">
			<Dialog.Header>
				<Dialog.Title>Event registration</Dialog.Title>
			</Dialog.Header>
			{#if form?.error}
				<Alert.Root variant="destructive">
					<CircleAlert class="size-4" />
					<Alert.Description>{form.error}</Alert.Description>
				</Alert.Root>
			{/if}
			<div class="grid gap-4 sm:grid-cols-2">
				<dl class="rounded-lg border border-amber-500 bg-amber-100 p-4">
					<dt class="mb-2 leading-none">Date</dt>
					<dd class="mb-2 flex items-center font-light">
						<Calendar size={16} class="mr-2" />
						<span class="font-normal">
							{activeEvent?.startDate} - {activeEvent?.endDate}
						</span>
					</dd>
					<dt class="mb-2 leading-none">Location</dt>
					<dd class="mb-2 flex items-center font-light">
						<MapPin size={16} class="mr-2" />
						<span class="font-normal"> N/A </span>
					</dd>
					<dt>Duration</dt>
					<dd>All day</dd>
				</dl>
				<dl>
					<dt class="mb-2 font-semibold leading-none">Details</dt>
					<dd class="text-gray-500">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, ullam officia officiis
						nobis minima aperiam ipsa iste exercitationem mollitia sapiente beatae animi, aliquid
						illum corrupti laborum voluptas quasi sit expedita?
					</dd>
				</dl>
			</div>
			<Dialog.Footer>
				<form
					method="POST"
					action="?/apply"
					use:enhance={() => {
						return async ({ result, update, formElement }) => {
							if (result.type === "success") {
								open = false;
								formElement.reset();
							}

							await update();
						};
					}}
				>
					<input type="hidden" name="eventId" value={activeEvent?.id} />
					<Button type="submit">Register</Button>
				</form>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
{/if}

<CalendarGrid events={data.events} {onEventClick} />
