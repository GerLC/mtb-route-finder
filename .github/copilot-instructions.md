You are an expert in TypeScript, Angular, and scalable web application development. You write maintainable, performant, and accessible code following Angular and TypeScript best practices.

## TypeScript Best Practices

- Use strict type checking.
- Prefer type inference when the type is obvious.
- Avoid the `any` type; use `unknown` when type is uncertain.

You are an expert TypeScript + Angular coding assistant working on this repository.

Keep the original best-practices in mind (signals, standalone-default, strict TS), but prefer guidance that matches the code in this repo.

### Quick Project Summary

- **Framework & version:** Angular 21 (standalone-default, signals) — see [package.json](../package.json) and `@angular/*` deps.
- **Runtime modes:** Browser dev server via Bun and Node-compatible SSR via `src/server.ts`.
- **Build output:** `bun run build` produces `dist/mtb-route-finder`; SSR server entry is expected at `dist/mtb-route-finder/server/server.mjs`.

### Developer Workflows (Bun)

- **Dev server:** `bun run start` (runs `ng serve`, opens on :4200).
- **Build:** `bun run build` (produces `dist/` and server bundle).
- **Watch:** `bun run watch` (dev watch build).
- **Tests:** `bun run test` (Karma).
- **SSR run (prod):** build then `bun run serve:ssr:mtb-route-finder`.
  - *Alternative:* You can run the bundle directly with `bun dist/mtb-route-finder/server/server.mjs`.

# Copilot / AI Assistant Instructions

This file tells coding assistants how the mtb-route-finder repo is structured and what project-specific conventions to follow. Keep answers concise, prefer small edits, and reference files when suggesting changes.

Key points

- **Framework:** Angular 21 (standalone-default, signals). See [package.json](../package.json).
- **Dev tooling:** Bun is used for scripts and local dev. Typical commands: `bun run start`, `bun run build`, `bun run watch`, `bun run test`.
- **SSR:** Server bootstrap is in [src/server.ts](../src/server.ts); server build output is `dist/mtb-route-finder/server/server.mjs`.

Architecture & important files

- App root: [src/app/app.ts](../src/app/app.ts) with template [src/app/app.html](../src/app/app.html).
- Routing: [src/app/app.routes.ts](../src/app/app.routes.ts) (client) and [src/app/app.routes.server.ts](../src/app/app.routes.server.ts) (prerender list).
- SSR providers: [src/main.server.ts](../src/main.server.ts) and [src/app/app.config.server.ts](../src/app/app.config.server.ts).
- Public/static assets: `public/` — the server and build expect assets here.

Conventions to follow (strictly)

- **Standalone components by default:** Do not add `standalone: true` — components are standalone in this repo.
- **Signals-first state:** Use `signal()` and `computed()` for local and derived state. Prefer `inject()` for service access.
- **Zoneless change detection:** The app uses `provideZonelessChangeDetection`. Avoid relying on Zone.js; keep template expressions side-effect free and `computed()` pure.
- **Feature layout:** Add features under `src/app/features/<feature>/` and register routes in `src/app/app.routes.ts` using `loadComponent` for lazy features.

Examples & patterns

- Add a lazy route by exporting a standalone component from `src/app/features/<name>/index.ts` and adding:

```ts
{
  path: 'my-feature',
  loadComponent: () => import('./features/my-feature').then(m => m.MyFeatureComponent)
}
```

- Shared types/helpers live in `src/app/shared/` — prefer extracting small pure transforms and reusing them.

Build / run / test

- Dev server: `bun run start` (runs `ng serve` and opens localhost:4200).
- Build (prod + server bundle): `bun run build` → outputs `dist/mtb-route-finder`.
- Run SSR bundle: `bun run serve:ssr:mtb-route-finder` or execute `bun dist/mtb-route-finder/server/server.mjs` directly.
- Tests: `bun run test` (Karma).

Integration notes

- Be conservative modifying `src/server.ts` and SSR providers — changes affect prerender and server behavior.
- Static assets and public URLs are served from `public/` and referenced by the server build; update both dev/public files and build pipeline when changing asset structure.

What to avoid

- Do not introduce Zone-dependent patterns or side-effects in templates.
- Avoid class-based RxJS state as a default — use signals and composables.

When in doubt

- Reference the route files ([src/app/app.routes.ts](../src/app/app.routes.ts)) and [src/app/app.config.server.ts](../src/app/app.config.server.ts) for SSR behavior.

If anything in this file is unclear or you'd like examples expanded (tests, DI tokens, or SSR specifics), ask and I'll add them.
