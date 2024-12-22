<script lang="ts">
	import { enhance } from "$app/forms";
	import { Badge } from "$components/badge/index.js";
	import { Button } from "$components/button";
	import { Checkbox } from "$components/checkbox/index.js";
	import { Input } from "$components/input";
	import { Label } from "$components/label";
	import * as Sheet from "$components/sheet/index.js";

	let { data, form } = $props();

	let selectedSkills: string[] = $state([]);
	let active = $state(false);

	let unselectedSkills = $derived(
		data.skills.filter((skill) => !data.userSkills.find((s) => s.id === skill.id))
	);

	function openSkillsModal() {
		active = true;
	}
</script>

<div
	class="flex max-w-[1220px] flex-col pt-8 md:mx-auto min-[1200px]:mt-0 min-[1200px]:grid min-[1200px]:grid-cols-[1fr]"
>
	<div
		class="bg-kui-light-bg dark:bg-kui-dark-bg border-kui-light-gray-200 dark:border-kui-dark-gray-400 overflow-hidden rounded-xl border"
	>
		<div class="flex w-full flex-col gap-2 gap-4 overflow-x-auto p-4 lg:p-6">
			<h3>Skills</h3>
			<h4>Manage your skills to be able to participate in events that require them.</h4>

			{#if form}
				{form.error}
			{/if}

			<div class="flex flex-wrap gap-2">
				{#each data.userSkills as userSkill, i}
					<Badge>
						{userSkill.name}
					</Badge>
				{/each}
			</div>
			<div class="flex flex-col gap-4">
				{#if selectedSkills.length > 0}
					<span>Selected skills (unsaved):</span>
				{/if}
				<div class="flex flex-wrap gap-2">
					{#each selectedSkills as id}
						{@const skill = data.skills.find((x) => x.id === id)}
						<Badge variant="secondary">{skill?.name}</Badge>
					{/each}
				</div>
				<Button onclick={openSkillsModal} class="w-[200px]">Select new skills</Button>
			</div>
		</div>
		<footer
			class="bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary border-kui-light-gray-200 dark:border-kui-dark-gray-400 h-[48px] w-full border-t"
		>
			<div class="flex h-full w-full flex-wrap items-center justify-between gap-4 px-4">
				<span>
					The skills will be used across the entire platform to easily find events that might be
					relevant to you.
				</span>
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
					<Button type="submit" size="sm">Save</Button>
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
			<h3>Email</h3>
			<h4>
				This is the email address you use to log in within <code>skillbridge</code>.
			</h4>
			<div class="w-[360px]">
				<Input type="email" name="email" value={data.user.email} disabled />
			</div>
		</div>
		<footer
			class="bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary border-kui-light-gray-200 dark:border-kui-dark-gray-400 h-[48px] w-full border-t"
		>
			<div class="flex h-full w-full flex-wrap items-center justify-between gap-4 px-4">
				<span>
					Emails must be verified before they can be used to log in with <code>skillbridge</code>.
				</span>
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
			<h3>First and last name</h3>
			<div class="w-1/2">
				<Input name="firstName" value={data.user.firstName} />
			</div>
			<div class="w-1/2">
				<Input name="lastName" value={data.user.lastName} />
			</div>
		</div>
		<footer
			class="bg-kui-light-bg-secondary dark:bg-kui-dark-bg-secondary border-kui-light-gray-200 dark:border-kui-dark-gray-400 h-[48px] w-full border-t"
		>
			<div class="flex h-full w-full flex-wrap items-center justify-between gap-4 px-4">
				<span>These values will be used across the entire platform.</span>
				<span><Button size="sm">Save</Button></span>
			</div>
		</footer>
	</div>
</div>

<Sheet.Root bind:open={active}>
	<Sheet.Trigger>Select new skills</Sheet.Trigger>
	<Sheet.Content>
		<Sheet.Header>
			<Sheet.Title>Select new skills</Sheet.Title>
			<Sheet.Description>PLACEHOLDER</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-4 py-4">
			<div class="grid grid-cols-2 items-center gap-4">
				{#each unselectedSkills as skill}
					<div>
						<Checkbox id={skill.id} onCheckedChange={() => selectedSkills.push(skill.id)} />
						<Label
							for={skill.id}
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							{skill.name}
						</Label>
					</div>
				{/each}
			</div>
		</div>
		<Sheet.Footer>
			<Sheet.Close>Save changes</Sheet.Close>
		</Sheet.Footer>
	</Sheet.Content>
</Sheet.Root>
