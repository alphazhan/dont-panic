<script lang="ts">
	import Notebook from './Notebook.svelte';
	import Properties from './Properties.svelte';
	import { currentPlanet, dataMask, sidebarMode } from '$data/stores';
	import Dialog from './Dialog.svelte';
	import { exoplanets } from '$data/exoplanetsData';

	$: currentPlanetData = exoplanets[$currentPlanet];
</script>

<div class="flex w-96 flex-col bg-white">
	{#if $sidebarMode === 'properties'}
		{#key $dataMask}
			<Properties data={currentPlanetData} mask={$dataMask} />
		{/key}
		<Notebook habitable={currentPlanetData.habitable} reason={currentPlanetData.whyResults} />
	{:else if $sidebarMode === 'chat'}
		<Dialog />
	{/if}
</div>
