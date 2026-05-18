import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: '.dist',
			assets: '.dist',
			fallback: undefined,
			precompress: false,
			strict: true
		}),

		prerender: {
			handleMissingId: "warn",

			//TODO: Enable link checking during build time
			crawl: false
		},

		alias: {
			"$components/*": "/src/components",
			"$icons/*": "/src/assets/icons",
			"$styling/*": "/src/styling",
			"$lib/*": "/src/lib/",
		}
	}
};

export default config;
