<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';
	import { Stars } from '@threlte/extras';
	import Interface from './interface/Interface.svelte';
	import Sidebar from './interface/Sidebar.svelte';
	import { currentPlanet } from '../../data/stores';
	import '../../data/i18';
</script>

<!-- <Studio enabled={dev} /> -->

<Interface />

<div class="flex h-screen">
	<div class="flex-grow">
		<Canvas>
			<Stars />

			{#key $currentPlanet}
				<Scene />
			{/key}
			<!-- <T.Mesh position={[0, 1, 0]}>
				<HTML transform sprite>
					<Alert>Hello!</Alert>
				</HTML>
			</T.Mesh> -->
		</Canvas>
	</div>

	<Sidebar />
</div>
