# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint check
```

No test framework is configured.

## Environment Variables

Copy `.env` and fill in before running:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` — required for OnchainKit (get from Coinbase Developer Platform)
- `NEXT_PUBLIC_URL` — deployment URL (falls back to `VERCEL_URL`, then `localhost:3000`)

## Architecture

This is a **Farcaster MiniApp** built on Next.js (App Router) + OnchainKit, targeting the **Base** chain (Coinbase L2).

### Provider & Chain Setup

`app/rootProvider.tsx` wraps the entire app with `OnchainKitProvider` configured for Base mainnet with MiniKit enabled (`autoConnect: true`). All blockchain context (wallet, wagmi, react-query) comes from this single provider — no separate wagmi config needed.

### MiniApp Manifest

`minikit.config.ts` is the single source of truth for the app's Farcaster identity:
- `accountAssociation` — signed proof linking to Farcaster FID 1343151 (domain: `lotty-miniapp-base.vercel.app`)
- `baseBuilder.ownerAddress` — `0x39361945Dc5D1269f6ca160739104BF299Ad5600`
- `miniapp` — metadata (name, icons, webhook URL, etc.), all URLs derived from `ROOT_URL`

This config is served at `GET /.well-known/farcaster.json` (via `app/.well-known/farcaster.json/route.ts`) using `withValidManifest()`.

### Authentication

`app/api/auth/route.ts` validates Farcaster Quick Auth JWTs. It verifies the token against the request origin (with Vercel/localhost fallback logic) and returns `{ userFid }`. `@farcaster/quick-auth` is a dev dependency.

### Key Patterns

- **Path alias:** `@/*` maps to the repo root — use for all internal imports
- **Client vs Server:** `page.tsx` and `rootProvider.tsx` are `"use client"`. `layout.tsx` is a server component that generates frame metadata from `minikitConfig`.
- **Styling:** CSS Modules (`*.module.css`) for component styles; `globals.css` for dark/light theme variables.
- **Webpack externals:** `pino-pretty`, `lokijs`, `encoding` are excluded from bundling (required for wagmi/viem compatibility).

### Adding Features

OnchainKit provides ready-made components for wallet, transactions, swaps, checkout, and identity. Import from `@coinbase/onchainkit/<feature>`. The `useMiniKit()` hook (from `@coinbase/onchainkit/minikit`) must be called in the root page component to initialize the MiniApp.
