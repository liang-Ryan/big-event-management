# AGENTS.md

## Cursor Cloud specific instructions

This is a Vue 3 + Vite frontend application (大事件管理系统 / Big Event Management System) for managing articles, categories, and user profiles.

### Services

| Service | How to run | Notes |
|---|---|---|
| Vite dev server | `pnpm run dev` | Starts on `http://localhost:5173` |

### Key commands

- **Dev server**: `pnpm run dev`
- **Lint**: `pnpm run lint` (ESLint with auto-fix; expect 4 component-name warnings — these are intentional)
- **Build**: `pnpm run build`
- **Format**: `pnpm run format` (Prettier)

### Important notes

- The app connects to a **remote backend API** at `http://big-event-vue-api-t.itheima.net` (configured in `src/utils/request.js`). There is no local backend.
- Test credentials from README: username `1311111111`, password `123456`. You may need to register first if the account doesn't exist.
- **No automated tests** exist in the codebase (no unit, integration, or e2e tests).
- Pre-commit hook (`.husky/pre-commit`) runs `pnpm lint-staged`, which executes ESLint on staged `.js`, `.ts`, `.vue` files.
- The `pnpm install` output may show a warning about ignored build scripts for `esbuild` and `vue-demi`; this is normal and does not affect functionality.
