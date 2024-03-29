import { defineConfig } from 'astro/config';

import postcssConfig from './postcss.config.js';

import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

const DEV_PORT = 2121;

// https://astro.build/config
export default defineConfig({
	site: process.env.CI
		? 'https://tudoehpureza.github.io'
		: `http://localhost:${DEV_PORT}`,
	base: process.env.CI ? '/' : undefined,
	//output: 'server',
	//adapter: cloudflare(),

	/* Like Vercel, Netlify,… Mimicking for dev. server */
	// trailingSlash: 'always',

	server: {
		/* Dev. server only */
		port: DEV_PORT,
	},
	integrations: [
		//
		sitemap(),
		tailwind(),
		react(),
	],
	build: {
		postcss: postcssConfig,
	},
	vite: {
		build: {
			minify: false,
		},
	},
});
