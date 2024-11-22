<script lang="ts">
	import Wrapper from "$lib/components/wrapper.svelte";
	import { Button, Input, Text } from "kampsy-ui";

	let { data } = $props();
</script>

<Wrapper title="Profile" />
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
