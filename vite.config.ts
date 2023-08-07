import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'import.meta.vitest': 'undefined',
	},
	test: {
		include: ['src/**/*.test.ts'],
		hookTimeout: 3000,
		teardownTimeout: 0,
		coverage: {
			all: true,
			include: ['src/**/*.{ts,js}'],
			reporter: ['lcov', 'text'],
		},
		// coverage: {
		// 	all: true,
		// 	include: ['src/**/*.ts'],
		// 	exclude: ['src/**/+*'],
		// },
	},
	server: {
		host: true,
	},
	resolve: {
		alias: {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
		},
	},
})
