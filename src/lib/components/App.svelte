<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { Stars } from '@threlte/extras';
	import Interface from '$interface/Interface.svelte';
	import Sidebar from '$interface/Sidebar.svelte';
	import { currentPlanet } from '$data/stores';
	import '$data/i18';
	import Audio from './Audio.svelte';
</script>

<!-- <Studio enabled={dev} /> -->

<Interface />

<div class="flex h-screen">
	<div class="flex-grow">
		<Canvas>
			<Stars />

			<Audio />

			{#key $currentPlanet}
				<Scene />
			{/key}
		</Canvas>
	</div>

	<Sidebar />
</div>
