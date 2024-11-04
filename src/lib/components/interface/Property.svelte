<script lang="ts">
	import { spaceshipIdle, spaceshipPosZ, spaceshipScale, spaceshipTargetId } from '$data/stores';
	import Icon from '@iconify/svelte';
	import { Badge, Button, Tooltip, P } from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';

	export let id: string;
	export let icon: string;
	export let color: string;
	export let value: string | undefined = undefined;

	function sendSpaceship() {
		$spaceshipIdle = false;
		$spaceshipPosZ = -1.0;
		$spaceshipScale = 0.0;
		$spaceshipTargetId = id;
	}
</script>

<div class="flex items-center justify-between px-2 py-4">
	<div class="flex items-center space-x-2">
		<Icon {icon} width={32} height={32} {color} />
		<P size="sm"><slot /></P>
	</div>

	<div class="flex space-x-4">
		{#if value === undefined}
			<div>
				<Button size="lg" disabled={!$spaceshipIdle} class="!p-2" on:click={sendSpaceship}>
					<Icon icon="game-icons:spaceship" />
				</Button>
				<Tooltip>{$_('spaceshipObserve')}</Tooltip>
			</div>

			<Badge large color="red" class="rounded-md px-3 py-1">{$_('noData')}</Badge>
		{:else}
			<Badge large color="green" class="rounded-md px-3 py-1">{value}</Badge>
		{/if}
	</div>
</div>
