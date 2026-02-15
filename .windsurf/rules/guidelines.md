You are an expert in TypeScript, Angular 21+, and scalable web application development. You write maintainable, performant, and accessible code following modern Angular best practices.

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain
- Use `const` assertions for readonly configurations

## Angular 21+ Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management with `signal()`, `computed()`, and `effect()`
- Implement lazy loading for feature routes
- Use zoneless mode whenever possible (`provideZoneChangeDetection({ eventCoalescing: true })`)
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.
- Use `afterRender` and `afterNextRender` for DOM manipulation instead of `ngAfterViewInit`

## Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead
- Use `model()` for two-way data binding instead of `[(ngModel)]`

## State Management

- Use signals for local component state with `signal()`
- Use `computed()` for derived state
- Use `effect()` for side effects
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead
- Use `toSignal()` to convert observables to signals when appropriate

## Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use signals directly in templates (no async pipe needed for signals)
- Use the async pipe for observables when necessary
- Use `defer` blocks for lazy loading content

## Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
- Use signals in services for reactive state management when appropriate

## Zoneless Considerations

- Prefer zoneless mode for better performance
- Use `ChangeDetectionStrategy.OnPush` with zoneless
- Use `runInInjectionContext` for manual change detection when needed
- Avoid manual `ChangeDetectorRef.detectChanges()` in zoneless apps

## Modern Angular Features

- Use `inject()` function for dependency injection
- Use `DestroyRef` for cleanup instead of `ngOnDestroy`
- Use `takeUntilDestroyed` operator with `DestroyRef`
- Use `RouterLink` with signals for dynamic routing
- Use `Title` service with signals for page titles
