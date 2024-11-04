<script lang="ts">
	import { T } from '@threlte/core';
	import { Color } from 'three';
	import vertexShader from '$shaders/star/vertex.glsl?raw';
	import fragmentShader from '$shaders/star/fragment.glsl?raw';

	// Define parameters for the star
	export let luminosity: number = 1.0; // Brightness of the star (affects glow intensity)
	export let starColor: string = '#ffffff'; // Default white star
	export let radius: number = 1.0; // Radius of the star
	export let glowStrength: number = 1.0; // Strength of the glow effect
	export let position: number[] = [0, 0, 0]; // Position of the star

	// Convert color to Three.js Color object
	let starColorVec3 = new Color(starColor);

	// Uniforms for the star shader
	const uniforms = {
		starColor: { value: starColorVec3 },
		luminosity: { value: luminosity },
		glowStrength: { value: glowStrength },
		radius: { value: radius }
	};
</script>

<T.Mesh {position}>
	<T.SphereGeometry></T.SphereGeometry>
	<T.ShaderMaterial {vertexShader} {fragmentShader} {uniforms} />
</T.Mesh>
