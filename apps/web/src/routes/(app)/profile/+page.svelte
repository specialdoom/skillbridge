<script lang="ts">
	import { enhance } from "$app/forms";
	import Wrapper from "$lib/components/wrapper.svelte";
	import { Badge, Button, Choicebox, Input, Modal, Text } from "@skillbridge/kampsy-ui";

	let { data, form } = $props();

	let selectedSkills = $state([]);
	let active = $state(false);

	let unselectedSkills = $derived(
		data.skills.filter((skill) => !data.userSkills.find((s) => s.id === skill.id))
	);

	const badgeVariants: ("green-subtle" | "blue-subtle" | "purple-subtle" | "teal-subtle")[] = [
		"green-subtle",
		"blue-subtle",
		"purple-subtle",
		"teal-subtle"
	];

	function openSkillsModal() {
		active = true;
	}
</script>

<Wrapper title="Profile" />
<div
	class="flex max-w-[1220px] flex-col pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<div
		class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 overflow-hidden rounded-xl border"
	>
		<div class="flex w-full flex-col gap-2 gap-4 overflow-x-auto p-4 lg:p-6">
			<Text size={24}>Skills</Text>
			<Text size={14}>
				Manage your skills to be able to participate in events that require them.
			</Text>

			{#if form}
				{form.error}
			{/if}

			<div class="flex flex-wrap gap-2">
				{#each data.userSkills as userSkill, i}
					<Badge variant={badgeVariants[i % 4]}>
						{userSkill.name}
					</Badge>
				{/each}
			</div>
			<div class="flex flex-col gap-4">
				{#if selectedSkills.length > 0}
					<Text>Selected skills (unsaved):</Text>
				{/if}
				<div class="flex flex-wrap gap-2">
					{#each selectedSkills as id}
						{@const skill = data.skills.find((x) => x.id === id)}
						<Badge>{skill?.name}</Badge>
					{/each}
				</div>
				<Button onclick={openSkillsModal} class="w-[200px]">Select new skills</Button>
			</div>
		</div>
		<footer
			class="bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary border-kui-light-gray-200 dark:border-kui-dark-gray-400 h-[48px] w-full border-t"
		>
			<div class="flex h-full w-full flex-wrap items-center justify-between gap-4 px-4">
				<Text size={14}>
					The skills will be used across the entire platform to easily find events that might be
					relevant to you.
				</Text>
				<form
					method="POST"
					action="?/userSkills"
					use:enhance={() => {
						return async ({ update }) => {
							selectedSkills = [];
							await update();
						};
					}}
				>
					{#each selectedSkills as skill}
						<input type="hidden" name="skillIds" value={skill} />
					{/each}
					<button type="submit">Save</button>
				</form>
			</div>
		</footer>
	</div>
</div>
<div
	class="flex max-w-[1220px] flex-col pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<div
		class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 overflow-hidden rounded-xl border"
	>
		<div class="flex w-full flex-col gap-2 gap-4 overflow-x-auto p-4 lg:p-6">
			<Text size={24}>Email</Text>
			<Text size={14}>
				This is the email address you use to log in within <code>skillbridge</code>.
			</Text>
			<div class="w-[360px]">
				<Input type="email" name="email" value={data.user.email} disabled />
			</div>
		</div>
		<footer
			class="bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary border-kui-light-gray-200 dark:border-kui-dark-gray-400 h-[48px] w-full border-t"
		>
			<div class="flex h-full w-full flex-wrap items-center justify-between gap-4 px-4">
				<Text size={14}>
					Emails must be verified before they can be used to log in with <code>skillbridge</code>.
				</Text>
			</div>
		</footer>
	</div>
</div>
<div
	class="flex max-w-[1220px] flex-col pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<div
		class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 overflow-hidden rounded-xl border"
	>
		<div class="flex w-full flex-col gap-2 gap-4 overflow-x-auto p-4 lg:p-6">
			<Text size={24}>First and last name</Text>
			<div class="w-1/2">
				<Input name="firstName" value={data.user.firstName} label="First name" />
			</div>
			<div class="w-1/2">
				<Input name="lastName" value={data.user.lastName} label="Last name" />
			</div>
		</div>
		<footer
			class="bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary border-kui-light-gray-200 dark:border-kui-dark-gray-400 h-[48px] w-full border-t"
		>
			<div class="flex h-full w-full flex-wrap items-center justify-between gap-4 px-4">
				<Text size={14}>These values will be used across the entire platform.</Text>
				<span><Button size="small">Save</Button></span>
			</div>
		</footer>
	</div>
</div>

<Modal.Root bind:active>
	<Modal.Content class="w-[700px]">
		<Modal.Body>
			<Modal.Header>
				<Modal.Title>Select skills</Modal.Title>
				<Modal.Subtitle>PLACEHOLDER</Modal.Subtitle>
			</Modal.Header>
			<Choicebox.Group label="Select a skill" type="checkbox" bind:value={selectedSkills}>
				<div class="grid gap-2 md:grid-cols-3">
					{#each unselectedSkills as skill}
						<Choicebox.Item
							title={skill.name}
							value={skill.id}
							onclick={() => console.log("click")}
						/>
					{/each}
				</div>
			</Choicebox.Group>
		</Modal.Body>
		<Modal.Footer>
			<Button onclick={() => (active = false)} variant="secondary">Cancel</Button>
			{#if selectedSkills.length > 0}
				<Badge variant="amber-subtle">{selectedSkills.length}</Badge>
			{/if}
			<Button onclick={() => (active = false)}>Submit</Button>
		</Modal.Footer>
	</Modal.Content>
</Modal.Root>
