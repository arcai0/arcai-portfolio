"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import MatrixEffect from "@/components/MatrixEffect";

type TerminalEntry = {
  id: number;
  type: "command" | "output" | "info";
  text: string;
};

const COMMAND_OUTPUTS: Record<string, string> = {
  whoami: "arcai - Full Stack Developer focusing on scalable web systems.",
  skills:
    "TypeScript, Node.js, Next.js, Git, and AI-driven automation.",
  games:
    "Competitive gaming and tactical analysis. I enjoy building tools that solve complex gameplay problems.",
  contact: "GitHub: github.com/arcai0",
  sudo: "Permission denied. This incident will be reported to arcai.",
  coffee: "Error 418: I am a teapot. Please insert caffeine to continue.",
};

const HELP_TEXT = [
  "Available commands:",
  "- help",
  "- whoami",
  "- skills",
  "- games",
  "- contact",
  "- sudo",
  "- matrix",
  "- coffee",
  "- message <text>",
  "- clear",
].join("\n");

export default function TerminalWidget() {
  const [showMatrixEffect, setShowMatrixEffect] = useState(false);
  const [history, setHistory] = useState<TerminalEntry[]>([
    {
      id: 1,
      type: "info",
      text: "arcai terminal loaded. Type 'help' to see commands.",
    },
  ]);
  const [input, setInput] = useState("");
  const [nextId, setNextId] = useState(2);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  const prompt = useMemo(() => "guest@arcai:~$", []);

  const runCommand = () => {
    const raw = input.trim();
    if (!raw) return;

    const command = raw.toLowerCase();
    const entries: TerminalEntry[] = [{ id: nextId, type: "command", text: raw }];
    let idCursor = nextId + 1;

    if (command === "clear") {
      setHistory([]);
      setInput("");
      setNextId(idCursor);
      return;
    }

    if (command === "help") {
      entries.push({ id: idCursor, type: "output", text: HELP_TEXT });
      idCursor += 1;
    } else if (command === "matrix") {
      setShowMatrixEffect(true);
    } else if (command === "message" || command.startsWith("message ")) {
      entries.push({
        id: idCursor,
        type: "output",
        text: "Transmission received. Saving your message to the vault...",
      });
      idCursor += 1;
    } else if (COMMAND_OUTPUTS[command]) {
      entries.push({
        id: idCursor,
        type: "output",
        text: COMMAND_OUTPUTS[command],
      });
      idCursor += 1;
    } else {
      entries.push({
        id: idCursor,
        type: "output",
        text: 'Command not found. Type "help" for a list of commands.',
      });
      idCursor += 1;
    }

    setHistory((prev) => [...prev, ...entries]);
    setInput("");
    setNextId(idCursor);
    inputRef.current?.focus();
  };

  return (
    <>
      {showMatrixEffect ? <MatrixEffect /> : null}
      <section className="w-full rounded-2xl border border-zinc-800 bg-black/95 font-mono text-sm text-zinc-300 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <p className="ml-2 text-xs text-zinc-500">terminal@arcai</p>
        </div>

        <div className="h-80 overflow-y-auto px-4 py-3">
          {history.map((entry) => (
            <div key={entry.id} className="mb-2 whitespace-pre-wrap break-words">
              {entry.type === "command" ? (
                <p>
                  <span className="text-emerald-400">{prompt}</span>{" "}
                  <span className="text-zinc-200">{entry.text}</span>
                </p>
              ) : entry.type === "info" ? (
                <p className="text-zinc-500">{entry.text}</p>
              ) : (
                <p className="text-zinc-300">{entry.text}</p>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2">
            <span className="text-emerald-400">{prompt}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  runCommand();
                }
              }}
              className="w-full bg-transparent text-zinc-200 outline-none placeholder:text-zinc-600"
              placeholder="Type a command..."
              autoComplete="off"
              spellCheck={false}
            />
          </div>

          <div ref={bottomRef} />
        </div>
      </section>
    </>
  );
}

