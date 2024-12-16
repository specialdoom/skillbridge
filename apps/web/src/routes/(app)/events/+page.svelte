<script lang="ts">
	import Calendar from "@event-calendar/core";
	import DayGrid from "@event-calendar/day-grid";
	import { Button, Modal, StatusDot } from "@skillbridge/kampsy-ui";

	let { data } = $props();
	const plugins = [DayGrid];

	let active = $state(false);
	let selectedEvent: {
		name: string;
		description: string;
		startDate: Date;
	} | null = $state(null);

	// TODO: map outside the component
	let options = {
		view: "dayGridMonth",
		events: data.events.map((x) => ({
			start: x.startDate,
			end: x.endDate,
			title: x.name,
			id: x.id,
			description: x.description
		})),
		firstDay: 1,
		eventClick: ({ event }: { event: { id: string } }) => {
			openEvent(event.id);
		},
		eventMouseLeave: () => {},
		eventMouseEnter: () => {}
	};

	async function openEvent(eventId: string) {
		try {
			const response = await fetch(`/api/events/one/${eventId}`, { method: "GET" });
			const data = await response.json();
			selectedEvent = data;
			active = true;
		} catch (e) {
			console.error(e);
		}
	}

	function cancelRegistration() {
		active = false;
		selectedEvent = null;
	}
</script>

<div
	class="flex max-w-[1220px] flex-col gap-6 pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<Calendar {plugins} {options} />
</div>

<Modal.Root bind:active>
	<Modal.Content class="w-[800px]">
		<Modal.Body>
			<Modal.Header>
				<Modal.Title>Register to the event</Modal.Title>
			</Modal.Header>
			<div class="flex w-full gap-4">
				<img
					src="https://images.unsplash.com/photo-1603604342747-b285bb892e2f?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt="test"
					class="w-[300px]"
				/>
				<div class="flex flex-1 flex-col gap-4">
					<dl>
						<dt class="text-kui-light-gray-900 dark:text-kui-dark-gray-900">Name</dt>
						<dd>{selectedEvent?.name}</dd>
					</dl>
					<dl>
						<dt class="text-kui-light-gray-900 dark:text-kui-dark-gray-900">Description</dt>
						<dd>{selectedEvent?.description ?? "There is no description for this event"}</dd>
					</dl>
					<dl>
						<dt class="text-kui-light-gray-900 dark:text-kui-dark-gray-900">Status</dt>
						<dd class="flex gap-2"><StatusDot state="READY" /> Ready</dd>
					</dl>
					<dl>
						<dt class="text-kui-light-gray-900 dark:text-kui-dark-gray-900">Date</dt>
						<dd class="flex gap-2">{selectedEvent?.startDate}</dd>
					</dl>
				</div>
			</div>
		</Modal.Body>
		<Modal.Footer>
			<Button onclick={cancelRegistration} type="secondary">Cancel</Button>
			<Button onclick={() => (active = false)}>Register</Button>
		</Modal.Footer>
	</Modal.Content>
</Modal.Root>
