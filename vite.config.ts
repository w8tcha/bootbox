import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	resolve: {
    alias: {
      '~bootstrap': fileURLToPath(new URL('./node_modules/bootstrap', import.meta.url)),
	  '~animate': fileURLToPath(new URL('./node_modules/animate.css', import.meta.url)),
    }
  },
	css: {
		preprocessorOptions: {
			scss: {
        api: "modern-compiler",
        silenceDeprecations: [
          "color-functions",
          "global-builtin",
          "if-function",
          "import",
        ],
      },
    },
    postcss: {
			plugins: [
				autoprefixer({}) // add options if needed
			],
		}
	},
	base: './',
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