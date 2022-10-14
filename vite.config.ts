import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	server: {
		host: true,
	},
	plugins: [sveltekit()],
};

export default config;
