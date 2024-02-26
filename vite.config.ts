import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [sveltekit(), SvelteKitPWA()],
	define: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'import.meta.vitest': 'undefined',
	},
	test: {
		environment: 'happy-dom',
		include: ['src/**/*.test.ts'],
		hookTimeout: 3000,
		teardownTimeout: 0,
		coverage: {
			all: true,
			include: ['src/**/*.ts'],
			exclude: [
				'src/**/+*.ts',
				'src/app.d.ts',
				'src/hooks.server.ts',
				'src/scripts/create_git_branch.ts',
				'src/lib/search-docs/*.ts',
			],
			reporter: ['lcov', 'text'],
		},
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
