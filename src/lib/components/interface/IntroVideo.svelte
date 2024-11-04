<script lang="ts">
	import { T } from '@threlte/core';
	import { HTML, useCursor } from '@threlte/extras';
	import Icon from '@iconify/svelte';
	import { videoShowed } from '$data/stores';
	import { fade } from 'svelte/transition';
	import { spring } from 'svelte/motion';

	export let position: number[] = [0, 0, 0];

	// Path to the video file
	import { PUBLIC_INTRO_VIDEO_URL } from '$env/static/public';
	const videoPath = '/intro.MOV';
	const iFramePath = PUBLIC_INTRO_VIDEO_URL;
	console.log('iFramePath: ', iFramePath);

	let iframeElement: HTMLIFrameElement | null = null;
	let videoElement: HTMLVideoElement | null = null;
	let videoReady = false;

	function handleVideoReady() {
		console.log('Intro video is ready!');
		videoReady = true; // Set video as ready once loaded
	}

	const closeVideo = () => {
		$videoShowed = true;
	};

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
				on:dblclick={() => videoElement?.requestFullscreen()}
			>
				<!-- Video element -->
				<!-- Show the video once it is ready -->
				<video
					bind:this={videoElement}
					src={videoPath}
					width={$scale * 162.0}
					autoplay={true}
					on:ended={closeVideo}
					on:canplay={handleVideoReady}
					playsinline
					preload="auto"
					class={!videoReady ? 'hidden' : ''}
				>
					<track kind="captions" />
					Your browser does not support the video tag.
				</video>

				<!-- Once the video is loaded, hide the iframe -->
				{#if !videoReady}
					<!-- Show the iframe while the video is loading -->
					<iframe
						bind:this={iframeElement}
						src={iFramePath}
						width={$scale * 192.0}
						frameborder={0}
						allow="autoplay; encrypted-media"
						allowfullscreen
						on:load={() => {}}
						title="Introduction video"
					>
						Your browser does not support the iframe tag.
					</iframe>
				{/if}

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
