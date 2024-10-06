<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { gameVolume, videoShowed } from '../../../data/stores';
	import { fade } from 'svelte/transition';
	import { spring } from 'svelte/motion';
	import { useCursor } from '@threlte/extras';

	export let position: number[] = [0, 0, 0];

	// Path to the video file
	const videoPath = '/src/assets/intro.MOV';
	let videoElement: HTMLVideoElement | null = null;

	const closeVideo = () => {
		$videoShowed = true;
		$gameVolume = 1.0; // Restore the volume
	};

	onMount(() => {
		$gameVolume = 0.0; // Mute the game volume while the video is playing
	});

	// Interactivity
	const scale = spring(1);
	const { onPointerEnter, onPointerLeave } = useCursor();
</script>

<T.Mesh {position}>
	<HTML sprite transform>
		{#if !$videoShowed}
			<button
				class="relative inline-block"
				transition:fade={{ duration: 300 }}
				on:pointerenter={onPointerEnter}
				on:pointerleave={onPointerLeave}
				on:pointerenter={() => {
					$scale = 1.25;
				}}
				on:pointerleave={() => {
					$scale = 1;
				}}
				on:click={() => videoElement?.requestFullscreen()}
			>
				<!-- Video element -->
				<video
					bind:this={videoElement}
					src={videoPath}
					width={$scale * 128.0}
					autoplay={true}
					on:ended={closeVideo}
					playsinline
				>
					<track kind="captions" />
				</video>

				<!-- Close icon button -->
				<button
					class="absolute right-1 top-1 rounded-full bg-transparent p-1 hover:bg-gray-200 focus:outline-none"
					on:click={closeVideo}
				>
					<Icon icon="material-symbols:close" class="h-4 w-4" />
				</button>
			</button>
		{/if}
	</HTML>
</T.Mesh>
