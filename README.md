# UI SDK vs Base UI — emoji picker

Side-by-side emoji pickers in Next.js: one built with a UI SDK custom primitive, one with [@base-ui/react](https://base-ui.com). Both share [`app/lib/emoji-catalog.ts`](./app/lib/emoji-catalog.ts).

## What's inside

| Path | Role |
| --- | --- |
| [`app/primitives/emoji-picker.ts`](./app/primitives/emoji-picker.ts) | UI SDK primitive (roving focus, typeahead, `agent`) |
| [`app/components/emoji-picker.tsx`](./app/components/emoji-picker.tsx) | React UI for the UI SDK primitive |
| [`app/components/baseui-emoji-picker.tsx`](./app/components/baseui-emoji-picker.tsx) | Base UI version (popover + grid buttons) |
| [`app/agent/agent-console.tsx`](./app/agent/agent-console.tsx) | Terminal UI for `snapshot` / `query` / `act` |
| [`app/page.tsx`](./app/page.tsx) | Side-by-side comparison layout |

## Run locally

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tests

```bash
bun run test
```

Includes agent bridge tests for the UI SDK emoji picker (`createAgent` from `@ui-sdk/react/agent`).

## Stack

- Next.js 16, React 19, Tailwind CSS 4
- `@ui-sdk/react` + `@ui-sdk/core` (beta)
- `@base-ui/react`

## Learn more

- [UI SDK](https://ui-sdk.dev)
- [Base UI](https://base-ui.com)