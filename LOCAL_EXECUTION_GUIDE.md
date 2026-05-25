# Certigrid Local Execution Guide

## 1. Current Scope

This guide covers the Phase 1 scaffold:

- Turborepo / npm workspace.
- Next.js web app in `apps/web`.
- Shared TypeScript package in `packages/shared`.
- Anchor/Solana scaffold in `programs/certigrid_program`.
- Supabase and infrastructure placeholder folders.

The current project is not yet a complete MVP application. It is the foundation for the MVP phases described in `docs/PLAN.md`.

## 2. Prerequisites

Required now:

- Node.js 22.x or compatible modern Node.js version.
- npm 10.x.

Required later for Solana program verification:

- Rust toolchain.
- Cargo.
- Solana CLI.
- Anchor CLI.

Current machine note:

- PowerShell blocks `npm.ps1`, so use `npm.cmd`.
- The Anchor/Solana toolchain was not available during setup, so `anchor build` was not verified.

## 3. Install Dependencies

From the repository root:

```cmd
cd /d D:\Certigrid
npm.cmd install
```

Then install the TypeScript-side dependencies for the Solana program folder:

```cmd
cd /d D:\Certigrid\programs\certigrid_program
npm.cmd install
```

Return to the root when finished:

```cmd
cd /d D:\Certigrid
```

## 4. Verify the Root Workspace

Run these from `D:\Certigrid`:

```cmd
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test
```

Production build:

```cmd
npm.cmd run build
```

Known local issue:

- In the sandboxed assistant environment, `next build` sometimes failed with Windows `EPERM` rename/unlink errors inside `.next` or `.turbo`.
- The same production build passed when run outside the sandbox.

## 5. Run the Web App Locally

Only run this when you intentionally want to start the local dev server:

```cmd
cd /d D:\Certigrid
npm.cmd run dev --workspace @certigrid/web
```

Default URL:

```text
http://localhost:3000
```

Stop the server with `Ctrl+C` in the terminal where it is running.

Project note:

- The assistant should not try to start the local dev server again unless explicitly asked.
- The last interrupted attempt left `127.0.0.1:3000` not running.

## 6. Web App Commands

From the root:

```cmd
npm.cmd run build --workspace @certigrid/web
npm.cmd run lint --workspace @certigrid/web
npm.cmd run typecheck --workspace @certigrid/web
npm.cmd run test --workspace @certigrid/web
```

The web app currently contains Phase 1 placeholder routes:

- `/`
- `/admin`
- `/marketplace`
- `/portfolio`
- `/audit`

## 7. Shared Package Commands

From the root:

```cmd
npm.cmd run build --workspace @certigrid/shared
npm.cmd run lint --workspace @certigrid/shared
npm.cmd run typecheck --workspace @certigrid/shared
npm.cmd run test --workspace @certigrid/shared
```

The shared package currently holds the Phase 1 domain types and lifecycle constants.

## 8. Solana Program Commands

From the Solana program folder:

```cmd
cd /d D:\Certigrid\programs\certigrid_program
```

TypeScript placeholder test:

```cmd
npm.cmd run test
```

Anchor commands, only after installing Rust, Solana CLI, and Anchor CLI:

```cmd
npm.cmd run build
npm.cmd run anchor:test
```

Formatting commands, only after installing Rust/Cargo:

```cmd
npm.cmd run lint
npm.cmd run format
```

## 9. Environment Variables

Root example:

```text
D:\Certigrid\.env.example
```

Web app example:

```text
D:\Certigrid\apps\web\.env.example
```

For local execution, create a local `.env` inside `apps/web` when needed:

```cmd
cd /d D:\Certigrid\apps\web
copy .env.example .env
```

Do not commit real secrets.

Expected web variables:

- `NEXT_PUBLIC_SOLANA_CLUSTER`
- `NEXT_PUBLIC_SOLANA_RPC_URL`
- `NEXT_PUBLIC_CERTIGRID_PROGRAM_ID`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## 10. Health Checklist

Use this checklist to confirm the Phase 1 scaffold is healthy:

```cmd
cd /d D:\Certigrid
npm.cmd install
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run test
npm.cmd run build
npm.cmd audit --audit-level=moderate

cd /d D:\Certigrid\programs\certigrid_program
npm.cmd install
npm.cmd run test
npm.cmd audit --audit-level=moderate
```

Expected current result:

- Root build passes.
- Root typecheck passes.
- Root lint passes.
- Root tests pass.
- Solana program TypeScript placeholder test passes.
- npm audit reports zero vulnerabilities at moderate level.

## 11. Known Limitations

- The app is a Phase 1 shell, not the finished MVP.
- The Anchor program is a scaffold and only includes an initial `register_asset` shape.
- On-chain build/test was not verified because the local Solana/Rust/Anchor toolchain was missing.
- Supabase migrations are not implemented yet.
- No live dev server should be assumed unless you start it manually.
