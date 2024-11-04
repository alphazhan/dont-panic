<script lang="ts">
	import { Alert, Button, SpeedDial, SpeedDialButton, Modal, Label, Input } from 'flowbite-svelte';
	import Icon from '@iconify/svelte';
	import BottomPanel from './BottomPanel.svelte';
	import { spaceshipIdle } from '$data/stores';
	import { fade } from 'svelte/transition';
	import { _, locale } from 'svelte-i18n';
	import { updateGenAIKey } from '$lib/chat/ai';

	let geminiModal = false;
	let authorsModal = false;
	let geminiApiKey = '';

	import TeamMember from './TeamMember.svelte';

	const members = [
		{
			name: 'Nurgaliyev Alzhan Askarovich',
			username: 'alphazhan',
			role: 'Coder'
		},
		{
			name: 'Murat Altair Didaruly',
			username: 'altushk_a',
			role: 'Project Manager'
		},
		{
			name: 'Zhunussova Aruzhan',
			username: 'xdenuare',
			role: 'Idea Creator'
		},
		{
			name: 'Rizabek Rassul Mansuruly',
			username: 'iau',
			role: 'Sound Producer'
		},
		{
			name: 'Kabdrakhmanova Aruzhan',
			username: 'azhhnn',
			role: 'Designer'
		},
		{
			name: 'Shupikava Katsiaryna Aliaksandravna',
			username: 'kattiers',
			role: 'Coder'
		}
	];

	function switchLocale() {
		if ($locale === 'kz') {
			$locale = 'by';
		} else if ($locale === 'by') {
			$locale = 'en';
		} else {
			$locale = 'kz';
		}
	}
</script>

<!-- Settings -->

<!-- To prevent error use additional absolute <div> -->
<div class="absolute">
	<SpeedDial
		class="absolute left-0 top-0 ml-4 mt-4 transform text-gray-500"
		pill={false}
		outline
		color="yellow"
	>
		<Icon slot="icon" icon="mdi:settings" class="h-6 w-6" />

		<SpeedDialButton name={$_('AI')} outline color="blue" on:click={() => (geminiModal = true)}>
			<Icon icon="simple-icons:googlegemini" class="h-8 w-8" />
		</SpeedDialButton>

		<SpeedDialButton name={$_('language')} outline color="red" on:click={switchLocale}>
			{#if $locale === 'kz'}
				<Icon icon="flag:kz-4x3" class="h-8 w-8" />
			{:else if $locale == 'by'}
				<Icon icon="flag:by-4x3" class="h-8 w-8" />
			{:else}
				<Icon icon="flag:us-4x3" class="h-8 w-8" />
			{/if}
		</SpeedDialButton>

		<SpeedDialButton
			name={$_('authors')}
			outline
			color="green"
			on:click={() => (authorsModal = true)}
		>
			<Icon icon="solar:info-circle-bold" class="h-7 w-7" />
		</SpeedDialButton>
	</SpeedDial>
</div>

<div class="absolute">
	<Modal bind:open={geminiModal} size="xs" autoclose={false} class="w-full" color="blue">
		<span class="px-1 text-black">GEMINI API KEY</span>

		<form
			class="flex flex-col"
			action="#"
			on:submit={() => {
				if (geminiApiKey != null) {
					updateGenAIKey(geminiApiKey);
				}

				geminiModal = false;
			}}
		>
			<Label class="space-y-2">
				<Input bind:value={geminiApiKey} placeholder="AIz.." />
			</Label>
		</form>
	</Modal>

	<Modal title="Team Members" color="green" bind:open={authorsModal} autoclose>
		<ul class="space-y-2">
			{#each members as member}
				<TeamMember name={member.name} username={member.username} role={member.role} />
			{/each}
		</ul>

		<svelte:fragment slot="footer">
			<div class="flex w-full justify-end">
				<Button color="green">{$_('nice')}</Button>
			</div>
		</svelte:fragment>
	</Modal>
</div>

<!-- Bottom Panel -->
<div class="absolute bottom-0 left-1/2 mb-4 -translate-x-1/2 transform pr-96">
	{#if !$spaceshipIdle}
		<div class="mb-4" transition:fade={{ duration: 300 }}>
			<Alert color="blue">
				<span class="font-medium">{$_('info')}!</span>
				{$_('spaceshipSent')}.
			</Alert>
		</div>
	{/if}

	<BottomPanel />
</div>
