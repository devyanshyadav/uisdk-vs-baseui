import { AgentConsole } from "../lib/agent/agent-console";
import { BaseUiEmojiPicker } from "../components/baseui-emoji-picker";
import { EmojiPicker } from "../components/emoji-picker";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-100 px-6 py-12 dark:bg-zinc-950 sm:py-16">
      <div className="w-full max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-3xl">
            Emoji picker comparison
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-pretty text-sm text-zinc-600 dark:text-zinc-400">
            Same catalog, two implementations. UI SDK uses a custom primitive
            (keyboard grid, typeahead, agent-ready). Base UI composes popover,
            input, and toggles with a click-first grid.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div>
              <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                UI SDK
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                <code className="font-mono text-xs">emoji-picker.ts</code> +
                Popover / Input / ToggleGroup
              </p>
            </div>
            <EmojiPicker />
          </section>

          <section className="flex flex-col gap-4 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
            <div>
              <h2 className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
                Base UI
              </h2>
              <p className="mt-1 text-sm text-zinc-500">
                <code className="font-mono text-xs">baseui-emoji-picker.tsx</code>
              </p>
            </div>
            <BaseUiEmojiPicker />
          </section>
        </div>

        <div className="mt-6">
          <AgentConsole />
        </div>
      </div>
    </div>
  );
}