<script lang="ts">
	import { T } from '@threlte/core';
	import { createNoise3D } from 'simplex-noise'; // Import 3D noise generator
	import { SphereGeometry } from 'three';

	// Shaders
	import vertexShader from '$shaders/exoplanet/vertex.glsl?raw';
	import fragmentShader from '$shaders/exoplanet/fragment.glsl?raw';
	import { hexToVec3, isStringAndStartsWithHash } from '$lib/utils';
	import { randomBrushPositions, type ExoplanetMaterial } from '$data/exoplanetsMaterial';

	// Export default exoplanet parameters as fallback
	export let exoplanetMaterial: ExoplanetMaterial = {
		color: '#ffff00', // Main surface color
		cloudCoverage: 0.0, // 50% cloud coverage
		cloudColor: '#ffffff', // White clouds
		surfaceRoughness: 1.0, // Noise scale for surface terrain
		atmosphereThickness: 0.0, // Intensity of atmosphere
		radius: 1.0, // Radius of the planet
		minDiffuse: 0.05, // Minimum diffuse light
		distanceToStar: 1.0, // Distance to the host Star

		// Updated parameters for scars and brush
		secondaryColor: '#000000',
		scarsPercentage: 0.0,
		brushColor: '#4b2e83',
		brushRadius: 0.0,
		brushCount: 1,
		horizontalExaggeration: 0.0
	};
	export let lightPosition: number[] = [0, 0, 0]; // Adjusted dynamically
	export let position: number[] = [0, 0, 0];

	// Albedo

	// Update color parameters to be vectors if they are valid hex strings
	Object.keys(exoplanetMaterial).forEach((key) => {
		const typedKey = key as keyof ExoplanetMaterial; // Assert the type of key
		const paramValue = exoplanetMaterial[typedKey];

		if (isStringAndStartsWithHash(paramValue)) {
			// Convert the hex string to a vector and assign it
			// @ts-ignore
			exoplanetMaterial[typedKey] = hexToVec3(paramValue as string);
		}
	});

	const selectedBrushPositions = randomBrushPositions.slice(0, exoplanetMaterial.brushCount);
	exoplanetMaterial.brushPositions = new Float32Array(selectedBrushPositions.flat());
	const uniforms = Object.fromEntries(
		// @ts-ignore
		Object.entries(exoplanetMaterial).map(([key, value]) => [key, { value }])
	);
	uniforms['lightPosition'] = { value: lightPosition };
	//=

	// 3D Noise generation of sphere geometry

	// Create a 3D noise generator
	const noise3D = createNoise3D();

	// Generate a sphere geometry with noise
	const sphereGeometry = new SphereGeometry(exoplanetMaterial.radius, 100, 100);
	const vertices = sphereGeometry.getAttribute('position').array;
	const surfaceRoughness = exoplanetMaterial.surfaceRoughness ?? 1.0;

	// Apply noise to the sphere vertices
	for (let i = 0; i < vertices.length; i += 3) {
		const x = vertices[i];
		const y = vertices[i + 1];
		const z = vertices[i + 2];

		// Adjust height based on noise
		const noiseValue = noise3D(x * surfaceRoughness, y * surfaceRoughness, z * surfaceRoughness);
		vertices[i + 2] += noiseValue; // Adjusting the z value (height)
	}

	// Update the geometry to reflect the modified vertices
	sphereGeometry.getAttribute('position').needsUpdate = true;
	//=
</script>

<T.Mesh {position}>
	<T.SphereGeometry geometry={sphereGeometry} />
	<T.ShaderMaterial {fragmentShader} {vertexShader} {uniforms} />
</T.Mesh>
