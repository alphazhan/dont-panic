<script lang="ts">
	import { T, useLoader } from '@threlte/core';
	import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
	import { MTLLoader } from 'three/examples/jsm/Addons.js';
	import { Mesh } from 'three/src/objects/Mesh.js';
	import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial.js';
	import { Float, HTML } from '@threlte/extras';
	import { fade } from 'svelte/transition';
	import { _ } from 'svelte-i18n';

	export let position: number[] = [0, 0, 0];
	export let scale: number = 1.0;

	const { load } = useLoader(MTLLoader, {
		extend: (loader) => {
			loader.manager.setURLModifier((url) => {
				return url;
			});
		}
	});

	const obj = useLoader(OBJLoader, {
		extend: async (loader) => {
			loader.setMaterials(await load('/spaceship/Transtellar.mtl'));
		}
	}).load('/spaceship/Transtellar.obj', {
		transform: (object) => {
			object.traverse((child) => {
				if (child instanceof Mesh) {
					const material = new MeshStandardMaterial({
						map: child.material.map,
						color: 0xffffff
					});

					child.material = material;
				}
			});
			return object;
		}
	});
</script>

<Float floatIntensity={1} rotationIntensity={1} rotationSpeed={[1, 0.5, 0.2]}>
	{#if $obj}
		<T is={$obj} {position} scale={0.2 * scale}></T>
		<T.Mesh {scale} position={[position[0], position[1] + 0.5, position[2]]}>
			<HTML sprite center transform>
				{#if scale >= 0.75}
					<p class="select-none text-xs text-white" transition:fade={{ delay: 250, duration: 300 }}>
						{$_('spaceshipMarvin')}
					</p>
				{/if}
			</HTML>
		</T.Mesh>
	{/if}
</Float>
