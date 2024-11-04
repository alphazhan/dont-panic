<script lang="ts">
	import { exoplanets, type Emotion } from '$data/exoplanetsData';

	// Sound tracks
	import SpaceMusic from '$assets/audio/space_music.wav';
	import FunnyMusic from '$assets/audio/funny_planet_music.wav';
	import PlayfulMusic from '$assets/audio/playful_planet_music.wav';
	import SadMusic from '$assets/audio/sad_planet_music.wav';
	import AngryMusic from '$assets/audio/angry_planet_music.wav';
	import { currentPlanet, sidebarMode, videoShowed } from '$data/stores';

	// Mapping moods to audio sources
	const audioSources: Record<Emotion, string> = {
		Funny: FunnyMusic,
		Playful: PlayfulMusic,
		Sad: SadMusic,
		Angry: AngryMusic
	};

	$: mood = $sidebarMode === 'chat' ? exoplanets[$currentPlanet]?.emotion : undefined;

	// Get the appropriate audio source based on mood
	$: src = audioSources[mood as Emotion] || SpaceMusic;

	// Define a variable for the HTMLAudioElement
	let audioElement: HTMLAudioElement | null = null;

	// Play the audio
	const playAudio = (): void => {
		if (audioElement) {
			audioElement?.play();
		}
	};

	// Pause the audio
	const pauseAudio = (): void => {
		audioElement?.pause();
	};

	$: if ($videoShowed) playAudio();
</script>

<audio bind:this={audioElement} {src} loop={true} autoplay={$videoShowed === true} />
