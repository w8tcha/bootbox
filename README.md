# Bootbox.js documentation

Hello intrepid explorer! Thank you for checking out the `gh-pages`
documentation branch. Pull requests are just as welcome here as they are for
the library itself, so thank you in advance for any contributions.

The site (published at [bootboxjs.com](https://bootboxjs.com)) is built with
[Vite](https://vitejs.dev/) and TypeScript/Sass — it's a static site, no
Jekyll or Ruby required.

## Prerequisites

- [Node.js](https://nodejs.org/) (with npm)

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```shell
   npm install
   ```
3. Start the dev server:
   ```shell
   npm run dev
   ```
   Vite will print a local URL to open in your browser. Changes to the HTML
   templates, TypeScript, and Sass are hot-reloaded.

## Project Structure

```
- 404.html, index.html, getting-started.html,
  examples.html, documentation.html, faq.html   # page templates (source)
- /src                                          # TypeScript and Sass sources
    - main.ts        # shared page behavior (nav, dialogs, search, etc.)
    - demos.ts        # interactive locale demo used on the documentation page
    - example.ts      # helper for the "example" callback demos
    - main.scss       # main stylesheet (Bootstrap + custom styles)
    - _variables.scss # Sass variable overrides
    - prism.js/.css    # Prism.js syntax highlighting
- /public                                       # static files copied as-is into /docs
    - index.json      # lunr search index, fetched client-side by main.ts
    - webfonts/
- /docs                                         # BUILD OUTPUT — do not edit by hand
- vite.config.ts                                # build config (page entry points, Sass aliases)
- build_index.cjs                               # regenerates public/index.json from /docs
- CNAME, license.txt
```

`/docs` is what GitHub Pages actually serves; it's generated entirely from the
root-level HTML templates plus `/src` and `/public`. Any change made directly
inside `/docs` will be overwritten the next time someone runs a build, so
always edit the source files instead.

## Build

To produce a production build in `/docs`:

```shell
npm run build
```

To preview that production build locally:

```shell
npm run preview
```

## Adding or Editing Pages

Each page of the site is a plain HTML template in the repository root
(`index.html`, `getting-started.html`, `examples.html`, `documentation.html`,
`faq.html`, `404.html`). These are registered as separate build entry points
in `vite.config.ts` (`build.rollupOptions.input`), so a new page needs an
entry added there too.

- Shared styles live in `src/main.scss` (Bootstrap is pulled in via the
  `~bootstrap` alias defined in `vite.config.ts`; `animate.css` via
  `~animate`).
- Shared/interactive behavior (dialog demos, the sidebar, search, etc.) lives
  in `src/main.ts`.
- Code samples are highlighted client-side with Prism.js
  (`src/prism.js`/`src/prism.css`) — remember to HTML-escape `<`, `>`, and `&`
  inside `<pre><code>` blocks.

## Rebuilding the Search Index

The site's search box is powered by [lunr.js](https://lunrjs.com/), reading
`index.json` at runtime. That file is generated from the *built* HTML in
`/docs` by `build_index.cjs`, then picked up as a static asset in `/public`
on the next build. After adding or changing documentation content, regenerate
it with:

```shell
npm run build
node build_index.cjs
npm run build
```

(build once so `/docs` reflects your content changes, regenerate the index
from that output, then build again so the refreshed `index.json` is copied
into `/docs`.)

## Updating Dependencies

```shell
npm run update-deps
```

This runs `npm-check -y`, which checks for outdated/unused dependencies and
applies all available updates without prompting.

## A Few Notes

- `docs/` is committed build output — after making source changes, run
  `npm run build` and commit the regenerated files along with your edits.
- Links between pages should be relative (e.g. `href="./getting-started"`),
  since the site can be served from a subpath and `vite.config.ts` sets
  `base: './'`.
