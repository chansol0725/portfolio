# Copilot instructions

## Project overview

- This is a React 19 + JavaScript single-page portfolio built with Vite. Node.js 24 LTS is the documented runtime.
- `src/main.jsx` mounts `App` and imports the shared stylesheet. `src/App.jsx` renders the home, about, portfolio list, and project detail views.
- Navigation is implemented with URL hash routes (`#/about`, `#/portfolio`, and `#/portfolio/<style>`), not a routing library. `useSyncExternalStore` subscribes to hash changes; the effect in `App` updates the document title, scroll position, and focus for each view.
- The `projects` array in `src/App.jsx` supplies both portfolio cards and detail pages. Its `style` value also determines the detail route and artwork variant in `ProjectArtwork`; keep these values and the project fields consistent when adding or editing a project.
- `src/App.css` contains component and page styles; `src/index.css` defines global styles, design tokens, and reduced-motion behavior. Public static assets belong in `public/`.
- The site content is Korean (`index.html` sets `lang="ko"`). The README describes the about copy and project descriptions as starter examples intended to be replaced with the owner's own content.

## Commands

Run these from the repository root:

```sh
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

`npm run lint` runs oxlint; to lint one source file, run `npx oxlint src/App.jsx` (or substitute another file path). `npm run build` creates the production site in `dist/`. There is currently no test script or test runner configured.

## Repository conventions

- Keep page navigation as hash links and update the hash-change handling and page-specific title/focus behavior if route views change.
- Treat `projects` as the source of truth for both list and detail content; project `style` strings must match the route suffixes and the variants handled by `ProjectArtwork`.
- Keep shared/global styles in `src/index.css` and page/component styles in `src/App.css`; honor the existing `prefers-reduced-motion` treatment.
