<script lang="ts">
	import Wrapper from "$lib/components/wrapper.svelte";
	import { RegistrationStatus } from "$lib/shared/models/registration";
	import { Menu, Pagination, SearchInput, Select, StatusDot, Text } from "@skillbridge/kampsy-ui";
	import { Accessibility, MoreHorizontal } from "@skillbridge/kampsy-ui/icons";

	let { data } = $props();

	const map = {
		[RegistrationStatus.Approved]: "READY",
		[RegistrationStatus.Pending]: "BUILDING",
		[RegistrationStatus.Rejected]: "ERROR",
		[RegistrationStatus.Target]: "QUEUED"
	};

	function getStatusDotState(status: RegistrationStatus) {
		if (status === RegistrationStatus.Approved) {
			return "READY";
		}

		if (status === RegistrationStatus.Pending) {
			return "BUILDING";
		}

		if (status === RegistrationStatus.Rejected) {
			return "ERROR";
		}

		if (status === RegistrationStatus.Target) {
			return "QUEUED";
		}

		return "QUEUED";
	}
</script>

<Wrapper title={data.event.name} centered />
<div
	class="flex max-w-[1220px] flex-col gap-8 pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<div>
		<div class="flex w-full justify-between">
			<Text variant="heading-24">Event management</Text>
			<div>Actions (coming soon)</div>
		</div>
		<div class="text-kui-light-gray-900 dark:text-kui-dark-gray-900">
			This is where you are managing the event
		</div>
	</div>
	<div
		class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 overflow-hidden rounded-xl border"
	>
		<div class="flex w-full gap-4 overflow-x-auto p-4 lg:p-6">
			<img
				src="https://images.unsplash.com/photo-1603604342747-b285bb892e2f?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
				alt="test"
				class="w-[400px]"
			/>
			<div class="flex flex-1 flex-col gap-4">
				<dl>
					<dt class="text-kui-light-gray-900 dark:text-kui-dark-gray-900">Description</dt>
					<dd>{data.event.description ?? "There is no description for this event"}</dd>
				</dl>
				<dl>
					<dt class="text-kui-light-gray-900 dark:text-kui-dark-gray-900">Status</dt>
					<dd class="flex gap-2"><StatusDot state="READY" /> Ready</dd>
				</dl>
			</div>
		</div>
	</div>
	<div>
		<div class="mb-4">
			<Text variant="heading-24" class="mb-4">Event registrations</Text>
			<div class="flex w-full gap-4">
				<Select.Root class="w-full lg:w-auto">
					<Select.Trigger class="w-full lg:w-[200px]">
						<Select.Value placeholder="Select a status" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="approved">
							<div class="flex gap-2"><StatusDot state="READY" />Approved</div>
						</Select.Item>
						<Select.Item value="rejected">
							<div class="flex gap-2"><StatusDot state="ERROR" />Rejected</div>
						</Select.Item>
						<Select.Item value="building">
							<div class="flex gap-2"><StatusDot state="BUILDING" />Pending</div>
						</Select.Item>
						<Select.Item value="target">
							<div class="flex gap-2"><StatusDot state="QUEUED" />Target</div>
						</Select.Item>
					</Select.Content>
				</Select.Root>
				<SearchInput placeholder="Search by name or email" />
			</div>
		</div>
		<div class="flex w-full flex-col gap-4">
			{#each data.registrations as registration}
				<div
					class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 rounded-xl border"
				>
					<div class="flex w-full items-center gap-4 overflow-x-auto p-4 lg:p-6">
						<div class="flex-1">{registration.firstName} {registration.lastName}</div>
						<div class="flex shrink-0 grow-0 basis-60 items-center gap-2 capitalize">
							<StatusDot state={map[registration.status]} />{registration.status}
						</div>
						<div class="flex-1">{registration.email}</div>
						<div>
							<Menu.Root>
								<Menu.Button aria-label="Menu" shape="square" size="small" type="secondary">
									<div class="h-[16px] w-[16px]">
										<MoreHorizontal />
									</div>
								</Menu.Button>
							</Menu.Root>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
