<script lang="ts">
	import { Heading } from 'flowbite-svelte';
	import Property from './Property.svelte';
	import { applyMask, type ExoplanetData, type ExoplanetDataMask } from '$data/exoplanetsData';
	import { _ } from 'svelte-i18n';

	export let data: ExoplanetData;
	export let mask: ExoplanetDataMask;

	let partialData: Partial<ExoplanetData> = applyMask(data, mask);

	const {
		name,
		color,
		distanceToStar,
		radius,
		mass,
		temperature,
		planetType,
		oneYear,
		interestingFact
	} = partialData;
</script>

<div class="max-h-full flex-grow overflow-auto p-4">
	<Heading tag="h5" class="text-center">{$_('exoplanet')}</Heading>

	<Property id="name" icon="mdi:text" color="#1a5fb4" value={name}>{$_('name')}</Property>

	<Property id="radius" icon="mdi:radius" color="#26a269" value={radius}>{$_('radius')}</Property>

	<Property id="mass" icon="material-symbols:weight" color="#613583" value={mass}>
		{$_('mass')}
	</Property>

	<Property id="color" icon="mdi:color" color="#e5a50a" value={color}>{$_('color')}</Property>

	<Property id="planetType" icon="pepicons-print:planet" color="#ff7800" value={planetType}>
		{$_('exoplanetType')}
	</Property>

	<Property
		id="distanceToStar"
		icon="game-icons:striped-sun"
		color="#a51d2d"
		value={distanceToStar}
	>
		{$_('distanceToTheStar')}
	</Property>

	<Property id="temperature" icon="solar:temperature-linear" color="#a51d2d" value={temperature}>
		{$_('temperature')}
	</Property>

	<Property id="oneYear" icon="game-icons:solar-time" color="#f5c211" value={oneYear}>
		{$_('oneYear')}
	</Property>
</div>
