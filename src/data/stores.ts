import { writable } from 'svelte/store';
import type { SingleMessageModel } from '../lib/chat/singleMessage';
import { createDefaultMask, exoplanets, shuffledExpls } from './exoplanetsData';
import { tweened } from 'svelte/motion';
import { cubicIn, cubicInOut } from 'svelte/easing';

export const currentPlanet = writable(shuffledExpls[0]);
export const userNotes = writable('Click here to open my notes');
export const sidebarMode = writable('properties');
export const dataMask = writable(createDefaultMask(false));
export const videoShowed = writable(false);

let currentExoplanetId = 0;

// Helper function to reset all writables
function resetStores() {
	userNotes.set('Click here to open my notes');
	sidebarMode.set('properties');
	dataMask.set(createDefaultMask(false));
	dialogHistory.set([]);
	spaceshipIdle.set(true);
	spaceshipTargetId.set('');
	// Reset tweened stores immediately (no tweening)
	spaceshipPosZ.set(-30, { duration: 0 }); // Directly set the initial value
	spaceshipScale.set(1.0, { duration: 0 }); // Directly set the initial value
}

// Function to go to the next exoplanet and reset all other stores
export function nextExoplanet() {
	currentExoplanetId = (currentExoplanetId + 1) % shuffledExpls.length;

	// Reset to the next exoplanet
	currentPlanet.set(shuffledExpls[currentExoplanetId]);

	// Reset other stores
	resetStores();
}

export const spaceshipIdle = writable<boolean>(true);
export const spaceshipPosZ = tweened(-30, {
	duration: 10000,
	easing: cubicInOut
});
export const spaceshipScale = tweened(1.0, {
	delay: 7000,
	duration: 2000,
	easing: cubicIn
});
export const spaceshipTargetId = writable<string>('');

export const dialogHistory = writable<SingleMessageModel[]>([]);
