<script lang="ts">
	import { sidebarMode } from '$data/stores';
	import { ButtonGroup, Button } from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';
</script>

<ButtonGroup>
	<Button
		shadow
		color={$sidebarMode === 'properties' ? 'primary' : 'alternative'}
		on:click={() => ($sidebarMode = 'properties')}
	>
		{$_('exoplanet_properties')}
	</Button>
	<Button
		shadow
		color={$sidebarMode === 'chat' ? 'primary' : 'alternative'}
		on:click={() => ($sidebarMode = 'chat')}
	>
		{$_('chat_exoplanet')}
	</Button>
</ButtonGroup>
