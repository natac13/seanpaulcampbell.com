# CLAUDE.md

Personal blog (seanpaulcampbell.com): an Astro site in `apps/website`, deployed to AWS with SST. Bun workspaces monorepo; scripts live in the root and `apps/website` `package.json`.

## Bun only

Run every script with `bun run <script>` and add packages with `bun add` / `bun add -D`. pnpm and npm rewrite `node_modules` and leave stray lockfiles; `pnpm aws:sso` fails outright on pnpm 11's build-script approval.

## Verifying a change

From `apps/website`: `bun run astro sync`, `bun run typecheck`, `bun run build`. From the root: `bun run format:check`, `bun run lint`. A change is verified when the pages load under `bun run dev` (Astro dev server) too, since the build alone misses runtime errors.

Local-only noise: `examples/*` have their own gitignored `node_modules` and generated files, so root `bun run typecheck` reports errors inside `examples/` that CI never sees. Judge by errors outside `examples/`.

## Deploys

CI (`.github/workflows/deploy.yml`) owns deploys: a PR deploys stage `dev` (dev.seanpaulcampbell.com), a push to `main` deploys `production`. Pushing to `main` ships to the live site.

Local SST commands use the `natac` AWS profile; log in with `bun run aws:sso`. Read `bun sst diff --stage <stage>` before any change to `sst.config.ts`, `infra/`, or the `sst` version, and confirm the CloudFront distribution and Lambda function update in place rather than replace. An SST major upgrade needs a one-time `bun sst refresh --stage <stage>` per stage before its first deploy.

## Version pins

- **Astro stays on 5.x.** The `astro-sst` adapter (3.1.4) does not support Astro 6+; every page is server-rendered through it. Recheck https://github.com/anomalyco/astro-sst/pull/27 before upgrading Astro.
- **TypeScript stays on 6.x** until `@astrojs/check` and Astro's language tools support TypeScript 7.

## UI components

shadcn with Base UI (`components.json` style `base-vega`); add components with `bun run ui-add <name>` from `apps/website`. Only `button`, `pagination`, and `scroll-area` exist; keep the site's own classes when regenerating them. lucide-react 1.x has no brand icons, so GitHub/LinkedIn/Twitter/Facebook come from `src/components/brand-icons.ts`.

Blog posts in `src/content/blog` contain code samples importing `components/ui/*`; those are prose, not real imports.

## Known issue

`/rss.xml` returns 403 on deployed stages but works locally, so the RSS nav link is commented out in `src/constants.ts`.

## TypeScript conventions

- `import type` at top level, never inline `import { type X }`.
- Named exports, except where a framework requires a default.
- `interface extends` over `&`; discriminated unions over bags of optional properties; `as const` objects over enums.
- `readonly` properties by default; `string | undefined` over `?:` when the caller must consider the value.
- Explicit return types on module-level functions, except JSX components.
- Names: new files kebab-case (existing PascalCase `.astro` components stay), camelCase values, PascalCase types, ALL_CAPS constants, `T`-prefixed generics (`TKey`).
