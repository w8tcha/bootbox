import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import banner from 'vite-plugin-banner';

export default defineConfig({
	plugins: [
		dts(), 
		banner(`/*! @preserve
 * bootbox.js
 * version: ${process.env.npm_package_version}
 * author: Nick Payne <nick@kurai.co.uk>
 * license: MIT
 * http://bootboxjs.com/
 */`)
	],
	build: {
		lib: {
			entry: './src/bootbox.ts',
			name: 'bootbox',
			fileName: 'bootbox',
			formats: ['es', 'iife', 'umd']
		},
		rollupOptions: {
			external: ['bootstrap'],
			output: {
				globals: {
					bootstrap: 'bootstrap'
				}
			},
		},
		sourcemap: true
	},
	test: {
		environment: 'jsdom',
		//environment: 'happy-dom',
		globals: true,
		include: [
			'tests/**/*.test.ts'],
			//'tests/bootbox.test.ts'],
		// Re-define "forceRerunTriggers" to exclude `package.json` and `test_tmp/**/package.json` to prevent infinite watch loop
		forceRerunTriggers: ['./vitest.config.js']
	}
});