<!-- Unused component -->

<script lang="ts">
	import { onMount } from 'svelte';

	export let text: string = 'Welcome to the world!'; // The text to type out
	export let typingSoundDuration: number = 48; // Duration of the typing sound in milliseconds (halved for 2x speed)
	export let typingSoundPath: string = 'src/assets/audio/typing_sound.wav'; // Path to typing sound

	let displayedText: string = ''; // Text that will be displayed on the screen
	const typingSound = new Audio(typingSoundPath); // Initialize typing sound

	// Function to play the typing sound
	const playTypingSound = () => {
		typingSound.currentTime = 0; // Reset sound to start
		typingSound.play(); // Play typing sound
	};

	// Async function to simulate typing effect
	async function typeText() {
		for (let index = 0; index < text.length; index++) {
			displayedText += text[index]; // Add next character
			playTypingSound(); // Play typing sound immediately

			// Wait for the duration of the typing sound before moving to the next character
			await new Promise((resolve) => setTimeout(resolve, typingSoundDuration));
		}
	}

	onMount(() => {
		typeText(); // Start typing effect on component mount
	});
</script>

<div class="p-4">
	<!-- Display the typed text -->
	<p class="text-lg font-bold">{displayedText}</p>
</div>

<style>
	/* You can add additional styles if needed */
</style>
