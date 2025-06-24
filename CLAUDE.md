# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Sean Paul Campbell's personal website and blog built with Astro and deployed to AWS using SST (Serverless Stack). The repository follows a monorepo structure with the main website in `apps/website/` and infrastructure code in `infra/`.

## Key Commands

### Development
- `bun dev` - Start SST development mode (spins up local dev environment)
- `cd apps/website && bun dev` - Start Astro development server locally
- `bun aws:sso` - Login to AWS SSO session (required for deployment)

### Code Quality
- `bun format` - Format code with Biome
- `bun format:check` - Check formatting without making changes
- `bun lint` - Lint code with Biome
- `bun lint:fix` - Fix linting issues automatically
- `bun typecheck` - Run TypeScript type checking across all workspaces
- `bun typecheck:ws` - Run TypeScript type checking for all workspace packages

### Website-specific (run from `apps/website/`)
- `bun build` - Build the Astro site for production
- `bun preview` - Preview the built site locally
- `bun typecheck` - Type check just the website
- `bun ui-add` - Add Shadcn/ui components

## Architecture

### Technology Stack
- **Frontend**: Astro with React integration, TailwindCSS, Shadcn/ui
- **Content**: Markdown-based blog posts with frontmatter
- **Deployment**: SST v3 on AWS (Lambda + CloudFront)
- **Code Quality**: Biome for formatting and linting
- **Package Manager**: Bun

### Project Structure
```
├── apps/website/          # Main Astro website
│   ├── src/
│   │   ├── components/    # Astro and React components
│   │   ├── content/       # Blog posts and content collections
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/         # Route pages
│   │   └── lib/           # Utility functions
├── examples/              # Code examples for blog posts
├── infra/                 # SST infrastructure code
│   ├── website.ts         # Website deployment config
│   ├── dns.ts             # Domain configuration
│   └── stage.ts           # Stage-specific settings
└── packages/              # Shared packages (if any)
```

### Content Management
- Blog posts are stored in `apps/website/src/content/blog/` as Markdown files
- Content collections are configured in `apps/website/src/content.config.ts`
- Images for posts go in `apps/website/src/assets/images/`

### Deployment Architecture
- **SST Configuration**: Root `sst.config.ts` automatically imports all files from `infra/`
- **Multi-stage**: Supports development, staging, and production deployments
- **Domain Management**: Configured in `infra/dns.ts` with automatic www redirects for production
- **Build Process**: Uses `bun run build` command specified in `infra/website.ts`

### Code Style
- Uses Biome for consistent formatting and linting
- TypeScript strict mode enabled
- Import organization and unused import removal configured
- Specific overrides for Astro files and test files

## Important Notes

- Always run `bun aws:sso` before deploying to ensure proper AWS authentication
- The website uses server-side rendering (SSR) mode in production
- Examples in the `examples/` directory are self-contained projects referenced by blog posts
- Biome configuration includes specific rules for different file types (Astro, tests, examples)
- The project uses workspaces, so commands can be run from root or specific workspace directories