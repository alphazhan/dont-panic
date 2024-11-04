<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { SingleMessageModel } from '$lib/chat/singleMessage';
	import { Avatar } from 'flowbite-svelte';

	import UserFrogIcon from '$assets/user.jpg';
	import SvelteMarkdown from 'svelte-markdown';

	export let message: SingleMessageModel; // Message passed with the properties
</script>

<div class={`flex ${message.isUser ? 'justify-end' : 'justify-start'} p-2`}>
	{#if message.isUser}
		<!-- Message for the user (avatar on the right) -->
		<div class="flex items-start space-x-4">
			<div class="max-w-xs rounded-lg border border-gray-300 p-2">
				<div class="text-right font-semibold text-gray-900">{message.userName}</div>
				<div class="text-right text-gray-700">
					<SvelteMarkdown source={message.messageContent} />
				</div>
			</div>

			<Avatar src={UserFrogIcon} />
		</div>
	{:else}
		<!-- Message from the exoplanet (avatar on the left) -->
		<div class="flex items-start space-x-4">
			<Avatar>
				<Icon icon="solar:planet-3-bold-duotone" width={64} height={64} />
			</Avatar>

			<div class="max-w-xs rounded-lg border border-gray-300 p-2">
				<div class="font-semibold text-gray-900">{message.userName}</div>
				<div class="text-gray-700"><SvelteMarkdown source={message.messageContent} /></div>
			</div>
		</div>
	{/if}
</div>

<!-- <img src={message.avatarUrl} alt="User Avatar" class="h-10 w-10 rounded-full" /> -->
