<script lang="ts">
	import { Audio } from '@threlte/extras';
	import type { Emotion } from '../../data/exoplanetsData';

	export let mood: Emotion | undefined = undefined;

	// Mapping moods to audio sources
	const audioSources: Record<Emotion, string> = {
		Funny: 'src/assets/audio/happy_planet_music.wav',
		Playful: 'src/assets/audio/playful_planet.wav',
		Sad: 'src/assets/audio/sad_planet_music.wav',
		Angry: 'src/assets/audio/angry_planet_music.wav'
	};

	// Get the appropriate audio source based on mood

	// @ts-ignore
	const src = audioSources[mood] || 'src/assets/audio/space_music.wav';
</script>

<Audio id="music" {src} autoplay={true} loop={true} />
