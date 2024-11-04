import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	assetsInclude: ['**/*.glsl'],
	plugins: [sveltekit()],
	build: {
		minify: false
	}
});
