<script lang="ts">
	import { enhance } from "$app/forms";

	let { data, form } = $props();
</script>

{#if form?.error}
	<p class="text-red">{form.error}</p>
{/if}

<form method="POST" action="?/group" use:enhance>
	Add a new skill group

	<input type="text" name="name" />
	<textarea name="description"></textarea>

	<button type="submit">Add</button>
</form>

<form method="POST" action="?/skill" use:enhance>
	Add a new skill

	<select name="skillGroupId">
		<option value="">Select a skill group</option>
		{#each data.skillGroups as skillGroup}
			<option value={skillGroup.id}>{skillGroup.name}</option>
		{/each}
	</select>

	<input type="text" name="name" />
	<button type="submit">Add</button>
</form>
