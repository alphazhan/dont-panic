<script lang="ts">
	import { T } from '@threlte/core';
	import { Grid, interactivity, OrbitControls } from '@threlte/extras';
	import Exoplanet from './space/Exoplanet.svelte';
	import { exoplanets } from '$data/exoplanetsData';
	import { exoplanetsMaterial } from '$data/exoplanetsMaterial';
	import Star from './space/Star.svelte';
	import Spaceship from './space/Spaceship.svelte';
	import {
		currentPlanet,
		dataMask,
		spaceshipIdle,
		spaceshipPosZ,
		spaceshipScale,
		spaceshipTargetId,
		dialogHistory
	} from '$data/stores';
	import IntroVideo from '$interface/IntroVideo.svelte';
	import { onMount } from 'svelte';
	import { _ } from 'svelte-i18n';

	$: if ($spaceshipPosZ === -1.0) {
		// Perform the desired action when animation reaches the end
		$spaceshipIdle = true;
		// Reset tweened stores immediately (no tweening)
		spaceshipPosZ.set(-30, { duration: 0 }); // Directly set the initial value
		spaceshipScale.set(1.0, { duration: 0 }); // Directly set the initial value
		dataMask.update((mask) => ({
			...mask, // Copy the existing values
			[$spaceshipTargetId]: true // Update the specific id with the new value
		}));
	}

	const { target } = interactivity();
	target.set(document.getElementById('int-target') ?? undefined);

	onMount(() => {
		$dialogHistory = [
			{
				userName: $_('exoplanet'),
				messageContent: `I'm ${exoplanets[$currentPlanet].emotion.toLowerCase()} ${exoplanets[$currentPlanet].whyEmotion}`, // The response from the AI
				isUser: false // This is the AI
			}
		];
	});
</script>

<T.PerspectiveCamera makeDefault position={[25, 2, 0]} fov={20} far={10000}>
	<OrbitControls autoRotate enableZoom enableDamping autoRotateSpeed={0.0} target.y={1.5} />
	<!-- autoRotateSpeed=0.5 -->
</T.PerspectiveCamera>

<IntroVideo position={[0, 2.75, 0]} />

<T.DirectionalLight intensity={0.8} position.x={0} position.y={0} castShadow />
<T.AmbientLight intensity={0.2} />

<!-- <HTML>
	<TypingText text="Welcome to the world!"/>
</HTML> -->

<Grid
	position.y={-1}
	cellColor="#ffffff"
	sectionColor="#ffffff"
	sectionThickness={0}
	fadeDistance={25}
	cellSize={2}
/>

<Exoplanet
	position={[0, 0, 0]}
	exoplanetMaterial={exoplanetsMaterial[$currentPlanet]}
	lightPosition={[0, 0, 100]}
/>

<Star
	position={[0, 0, exoplanetsMaterial[$currentPlanet].distanceToStar * 10000.0]}
	luminosity={0.0}
	starColor="#FFD700"
	radius={10}
	glowStrength={1.5}
/>

<Spaceship position={[0, 0, $spaceshipPosZ]} scale={$spaceshipScale} />
