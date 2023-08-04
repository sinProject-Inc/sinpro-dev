import adapter from '@sveltejs/adapter-node'
// import preprocess from 'svelte-preprocess'
import { vitePreprocess } from '@sveltejs/kit/vite'
import { readFile } from 'fs/promises'
import { fileURLToPath } from 'url'

const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = await readFile(file, 'utf-8')
const pkg = JSON.parse(json)

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	// preprocess: preprocess(),

	kit: {
		adapter: adapter({
			precompress: true,
		}),
		version: {
			name: pkg.version,
		},
		// paths: {
		// 	base: '/sinpro-dev',
		// },
	},
}

export default config
