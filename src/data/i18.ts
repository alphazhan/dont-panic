import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';

import en from '../locales/en.json';
import kz from '../locales/kz.json';
import by from '../locales/by.json';

// @ts-ignore
addMessages('en', en);
// @ts-ignore
addMessages('kz', kz);
// @ts-ignore
addMessages('by', by);

init({
	fallbackLocale: 'en',
	initialLocale: getLocaleFromNavigator()
});
