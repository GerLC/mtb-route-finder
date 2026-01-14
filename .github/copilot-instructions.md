
You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` when type is uncertain.

You are an expert TypeScript + Angular coding assistant working on this repository.

Keep the original best-practices in mind (signals, standalone-default, strict TS), but prefer guidance that matches the code in this repo.

### Quick Project Summary

- **Framework & version:** Angular 21 (standalone-default, signals) — see [package.json](package.json) and `@angular/*` deps.
- **Runtime modes:** Browser dev server via Bun and Node-compatible SSR via `src/server.ts`.
- **Build output:** `bun run build` produces `dist/mtb-route-finder`; SSR server entry is expected at `dist/mtb-route-finder/server/server.mjs`.

### Developer Workflows (Bun)

- **Dev server:** `bun run start` (runs `ng serve`, opens on :4200).
- **Build:** `bun run build` (produces `dist/` and server bundle).
- **Watch:** `bun run watch` (dev watch build).
- **Tests:** `bun run test` (Karma).
- **SSR run (prod):** build then `bun run serve:ssr:mtb-route-finder`.
  - *Alternative:* You can run the bundle directly with `bun dist/mtb-route-finder/server/server.mjs`.

### Architecture & Important Files

- `src/app/` is the app root. The root component is in [src/app/app.ts](src/app/app.ts) using external template [src/app/app.html](src/app/app.html).
- **Routing:** App routes live in [src/app/app.routes.ts](src/app/app.routes.ts). Server prerender routes are in [src/app/app.routes.server.ts](src/app/app.routes.server.ts).
- **SSR / Server Bootstrap:** [src/main.server.ts](src/main.server.ts) and [src/app/app.config.server.ts](src/app/app.config.server.ts) configure server rendering providers.
- **Express Server Wrapper:** [src/server.ts](src/server.ts) — defines static asset handling and the request handler used in production.
- **Public Assets:** Served from the `public/` folder.

### Project-Specific Conventions

- **Standalone-Default:** Components are standalone by default. Do **not** add `standalone: true` to the component metadata (it is the default in this version).
- **Signals-First:** Use signals for local state (`signal()`, `computed()`) and inputs (`input()`, `output()`). Avoid class-based RxJS state where possible.
- **Zoneless Change Detection:** The project uses `provideZonelessChangeDetection`.
  - Do not rely on Zone.js patching.
  - Prefer pure signal updates.
  - Side-effects in templates are strictly discouraged.
- **Feature Layout:** Put features under `src/app/features/` (e.g., `src/app/features/route-finder/`). Register routes in `app.routes.ts`.

### Coding Principles (DRY & SOLID)

- **DRY:** Extract shared types, UI fragments, and helpers into `src/app/shared/`.
- **Single Responsibility:** Components should only render. Move logic to composable functions or services (`inject()` usage preferred).
- **Dependency Inversion:** Inject abstract services or tokens where needed instead of concrete implementations.
- **Pure Transforms:** Keep `computed()` derivations pure to ensure zoneless detection remains predictable.

### Build & SSR Notes

- To produce the production files, run: `bun run build`.
- The Angular build configuration in [angular.json](angular.json) ensures the server bundle is placed under `dist/mtb-route-finder/server`.
- **Dev SSR flow:** During development, prefer `bun run start` (standard dev server). Use the SSR script only for production simulation or testing hydration.

### Where to Make Common Changes

- **Add Feature Code:** `src/app/features/<feature>/`. Export a route config and update [src/app/app.routes.ts](src/app/app.routes.ts).
- **Global Config:** Modify [src/app/app.config.ts](src/app/app.config.ts). Merge server-specific config in [src/app/app.config.server.ts](src/app/app.config.server.ts).
- **Styling:** Use `src/styles.scss`. Tailwind + DaisyUI are configured.

### Testing & CI Hints

- Unit tests use Karma: `bun run test`.
- **CI Steps:** Ensure you run `bun run build` before attempting to start the server bundle.

### Examples (Common Tasks)

**1. Add a route for a lazy feature:**
Create `src/app/features/my-feature/index.ts` exporting a standalone component.
Add to [src/app/app.routes.ts](src/app/app.routes.ts):

```typescript
{
  path: 'my-feature',
  loadComponent: () => import('./features/my-feature').then(m => m.MyFeatureComponent)
}
```
