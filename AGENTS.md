<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## API and scope ground rules

- Read `docs/api-contract.md` before doing API work.
- Stay within the current task or issue. Do not expand the scope without asking
  the human developer.
- Do not silently change API methods, paths, inputs, outputs, or status
  behavior.
- Keep credentials server-side. Never commit secrets or `.env.local`.
- Do not expose junction-table structure as the public API unless the contract
  explicitly requires it.
