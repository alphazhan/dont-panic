<script lang="ts">
	import Icon from '@iconify/svelte';
	import { nextExoplanet, userNotes } from '$data/stores';
	import { Button, Modal, Textarea, Hr } from 'flowbite-svelte';
	import { _ } from 'svelte-i18n';
	let defaultModal: boolean = false;
	let resultsModel: boolean = false;
	let results: boolean | undefined;

	export let habitable: boolean;
	export let reason: string;

	function onSubmit(userAnswer: boolean) {
		results = userAnswer === habitable;
		resultsModel = true;
	}

	function onFinish() {
		nextExoplanet();
	}
</script>

<div
	role="button"
	tabindex="0"
	aria-label="Open Notes"
	class="h-64 w-96 max-w-96 cursor-pointer overflow-hidden text-balance bg-orange-300 p-4"
	on:click={() => (defaultModal = true)}
	on:keydown={(event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			defaultModal = true;
		}
	}}
>
	<div class="h-full overflow-y-auto break-words text-left">
		{$userNotes}
	</div>
</div>

<Modal title="Notebook" bind:open={defaultModal} autoclose>
	<Textarea
		id="textarea"
		placeholder={$_('yourNotesEll')}
		rows={10}
		name="notebook"
		bind:value={$userNotes}
	/>

	<svelte:fragment slot="footer">
		<div class="flex w-full justify-between space-x-6">
			<Button color="red" on:click={() => onSubmit(false)}>{$_('thisIsNotHabitable')}</Button>

			<Button color="green" on:click={() => onSubmit(true)}>
				{$_('thisIsHabitable')}
			</Button>
		</div>
	</svelte:fragment>
</Modal>

<Modal size="sm" bind:open={resultsModel} autoclose>
	<div class="flex w-full flex-col items-center">
		{#if results === true}
			<Icon icon="icon-park:correct" class="h-8 w-8 text-green-600" />
			<p class="text-xl text-green-600">{$_('correct')}!</p>
		{:else}
			<Icon icon="ic:round-close" class="h-8 w-8 text-red-600" />
			<p class="text-xl text-red-600">{$_('wrong')}!</p>
		{/if}
	</div>

	<Hr />

	<p class="text-base leading-relaxed text-gray-800 dark:text-gray-400">
		This planet is {habitable ? $_('lHabitable') : $_('lNotHabitable')} because
		{reason}
	</p>

	<svelte:fragment slot="footer">
		<Button on:click={onFinish} class="flex w-full">{$_('accept')}</Button>
	</svelte:fragment>
</Modal>
