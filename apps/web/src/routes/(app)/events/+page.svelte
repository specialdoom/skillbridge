<script lang="ts">
	import Calendar from "@event-calendar/core";
	import TimeGrid from "@event-calendar/time-grid";

	let { data } = $props();

	let plugins = [TimeGrid];
	let options = {
		view: "timeGridWeek",
		events: data.events.map((x) => ({
			name: x.name,
			start: new Date(x.startDate),
			end: new Date(x.endDate)
		}))
	};
</script>

<Calendar {plugins} {options} />
