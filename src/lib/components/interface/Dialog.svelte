<script lang="ts">
	import { talkToAI } from '$chat/ai';
	import { exoplanets } from '$data/exoplanetsData';
	import { currentPlanet, dialogHistory } from '$data/stores';
	import MessageInput from './MessageInput.svelte';
	import SingleMessage from './SingleMessage.svelte';

	import { Heading } from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';

	function handleMessage(event: CustomEvent) {
		const userMessageContent = event.detail.text;
		dialogHistory.update((currentHistory) => [
			...currentHistory,
			{
				userName: 'Ramazan Meloman',
				messageContent: userMessageContent,
				isUser: true // This is the user
			}
		]);

		// Send the user's message to AI and get the response
		const inputText = userMessageContent; // Use the user's input as the input for AI
		talkToAI(
			inputText,
			exoplanets[$currentPlanet].llmContext,
			exoplanets[$currentPlanet].emotion + ' ' + exoplanets[$currentPlanet].whyEmotion
		)
			.then((aiResponse) => {
				// Add the AI's response to the messages array
				dialogHistory.update((currentHistory) => [
					...currentHistory,
					{
						userName: $_('exoplanet'),
						messageContent: aiResponse, // The response from the AI
						isUser: false // This is the AI
					}
				]);
			})
			.catch((error) => {
				console.error('Error talking to AI:', error);
			});
	}
</script>

<div class="flex h-full flex-col bg-gray-100 p-4">
	<Heading tag="h5" class="pb-6 text-center">{$_('chat')}</Heading>

	<!-- Scrollable messages container -->
	<div class="flex-grow overflow-y-auto">
		{#each $dialogHistory as message}
			<SingleMessage {message} />
		{/each}
	</div>

	<!-- Message input component (if needed) -->
	<MessageInput on:message={handleMessage} />
</div>
