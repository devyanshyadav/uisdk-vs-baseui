"use client";

import { Button } from "@ui-sdk/react/button";
import { useEffect, useRef, useState } from "react";
import { agent } from "./agent";

type Line = { id: number; kind: "cmd" | "out" | "err"; text: string };

type Command = {
  label: string;
  cmd: string;
  exec: () => Promise<unknown> | unknown;
};

const COMMANDS: Command[] = [
  {
    label: "snapshot()",
    cmd: "agent.snapshot()",
    exec: () => agent.snapshot(),
  },
  {
    label: 'query("Sad")',
    cmd: 'agent.query({ within: "Reaction", text: "Sad" })',
    exec: () => agent.query({ within: "Reaction", text: "Sad" }),
  },
  {
    label: 'act("😢")',
    cmd: 'agent.act({ steps: [{ ref: "Reaction", action: "setValue", args: ["😢"] }] })',
    exec: () =>
      agent.act({
        steps: [{ ref: "Reaction", action: "setValue", args: ["😢"] }],
      }),
  },
  {
    label: 'query("Fire")',
    cmd: 'agent.query({ within: "Reaction", text: "Fire" })',
    exec: () => agent.query({ within: "Reaction", text: "Fire" }),
  },
  {
    label: 'act("🔥")',
    cmd: 'agent.act({ steps: [{ ref: "Reaction", action: "setValue", args: ["🔥"] }] })',
    exec: () =>
      agent.act({
        steps: [{ ref: "Reaction", action: "setValue", args: ["🔥"] }],
      }),
  },
];

const INITIAL_LINES: Line[] = [
  {
    id: 0,
    kind: "out",
    text: "Ready. Calls run agent.snapshot() / query() / act() and log to DevTools.",
  },
];

const LINE_CLASS: Record<Line["kind"], string> = {
  cmd: "mt-2 block rounded bg-zinc-900/70 px-1.5 py-0.5 font-semibold text-white first:mt-0",
  err: "block whitespace-pre-wrap text-red-400",
  out: "block whitespace-pre-wrap text-zinc-300",
};

const cmdButton =
  "h-7 rounded border border-zinc-800 bg-zinc-900 px-2.5 font-mono text-[11px] text-zinc-300 transition-colors hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-50";

function AgentConsole() {
  const outputRef = useRef<HTMLPreElement>(null);
  const lastCmdRef = useRef<HTMLSpanElement>(null);
  const nextId = useRef(1);
  const [busy, setBusy] = useState(false);
  const [lines, setLines] = useState<Line[]>(INITIAL_LINES);

  const lastCmdIndex = lines.findLastIndex((line) => line.kind === "cmd");

  useEffect(() => {
    if (lastCmdIndex < 0) return;
    const container = outputRef.current;
    const cmdEl = lastCmdRef.current;
    if (container && cmdEl) {
      const delta =
        cmdEl.getBoundingClientRect().top -
        container.getBoundingClientRect().top;
      container.scrollTop = Math.max(0, container.scrollTop + delta - 12);
    }
  }, [lines, lastCmdIndex]);

  function append(kind: Line["kind"], text: string) {
    const id = nextId.current++;
    setLines((prev) => [...prev, { id, kind, text }]);
  }

  async function run({ cmd, exec }: Command) {
    setBusy(true);
    append("cmd", cmd);
    try {
      const result = await exec();
      console.log(cmd, result);
      append("out", JSON.stringify(result, null, 2));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(cmd, error);
      append("err", `error: ${message}`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-800 bg-[#0a0a0c] font-mono text-zinc-200 shadow-lg">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3 py-1.5">
        <span className="flex items-center gap-2 text-[11px] text-zinc-400">
          <span className="text-zinc-500">&gt;_</span>
          <span>agent — zsh — @ui-sdk/react/agent</span>
        </span>
        <Button
          className="h-6 rounded px-2 font-mono text-[11px] text-zinc-500 hover:bg-zinc-800 hover:text-zinc-200"
          onClick={() => setLines([])}
        >
          clear
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-900 bg-zinc-950/90 px-3 py-2">
        <span className="mr-1 text-[11px] text-zinc-500">run:</span>
        {COMMANDS.map((item) => (
          <Button
            key={item.label}
            disabled={busy}
            className={cmdButton}
            onClick={() => run(item)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <pre
        ref={outputRef}
        className="max-h-64 overflow-auto p-3 font-mono text-xs leading-5"
      >
        {lines.map((line, index) => (
          <span
            key={line.id}
            ref={index === lastCmdIndex ? lastCmdRef : undefined}
            className={LINE_CLASS[line.kind]}
          >
            {line.kind === "cmd" ? (
              <>
                <span className="mr-2 select-none text-emerald-400">$</span>
                {line.text}
              </>
            ) : (
              line.text
            )}
          </span>
        ))}
        <span className="mt-2 block text-zinc-500">
          <span className="mr-2 select-none text-emerald-400">$</span>
          <span className="inline-block h-3.5 w-1.5 translate-y-0.5 bg-zinc-400 align-middle" />
        </span>
      </pre>
    </section>
  );
}

export { AgentConsole };