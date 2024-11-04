<script lang="ts">
	import { Button, Textarea } from 'flowbite-svelte';
	import Icon from '@iconify/svelte'; // Importing iconify for the send icon
	import { createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';

	let message = ''; // Bind message to the input

	const dispatch = createEventDispatcher();

	const sendMessage = () => {
		if (message.trim() !== '') {
			dispatch('message', { text: message });
			message = ''; // Clear input after sending
		}
	};
</script>

<form class="flex max-w-md items-end border-t-2 pt-4">
	<!-- Input field -->
	<Textarea
		id="message"
		name="message"
		bind:value={message}
		placeholder={$_('typeMessageEll')}
		class="flex-grow px-2 py-1 focus:outline-none"
	/>

	<!-- Button with send icon -->
	<Button color="primary" on:click={sendMessage} class="ml-2 p-2">
		<Icon icon="mdi:send" class="h-4 w-4 text-white" />
	</Button>
</form>
