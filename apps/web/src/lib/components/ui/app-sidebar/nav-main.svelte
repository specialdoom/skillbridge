<script lang="ts">
	import * as Sidebar from '$components/sidebar';
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton>
					<a href="/dashboard">Dashbard</a>
				</Sidebar.MenuButton>
				<Sidebar.MenuButton>
					<a href="/events">Events</a>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
