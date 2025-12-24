import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	resolve: {
    alias: {
      '~bootstrap': './node_modules/bootstrap',
	  '~animate': './node_modules/animate.css',
    }
  },
	css: {
		postcss: {
			plugins: [
				autoprefixer({}) // add options if needed
			],
		}
	},
	build: {
		outDir: './docs',
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: 'index.html',
				documentation: 'documentation.html',
				'getting-started': 'getting-started.html',
				faq: 'faq.html',
				examples: 'examples.html',
				404: '404.html',
			}
		}
  }
});