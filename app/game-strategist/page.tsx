"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type Mode = "valorant" | "lol";

type StrategyDashboard = {
  early: string[];
  items: string[];
  tips: string[];
};

function parseStrategyDashboard(text: string): StrategyDashboard {
  const lines = text.split(/\r?\n/);
  const dash: StrategyDashboard = { early: [], items: [], tips: [] };
  let current: keyof StrategyDashboard | null = null;

  const isHeading = (line: string, heading: string) =>
    new RegExp(`^\\s*${heading}\\s*:?.*\\s*$`, "i").test(line);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    if (isHeading(line, "Early Game Strategy")) {
      current = "early";
      continue;
    }
    if (isHeading(line, "Core Items/Build")) {
      current = "items";
      continue;
    }
    if (isHeading(line, "Pro Tips")) {
      current = "tips";
      continue;
    }

    if (!current) continue;

    // Expected format: "- bullet". Allow common variants too.
    const cleaned = line
      .replace(/^[-*•]\s*/g, "")
      .replace(/^\d+\)\s*/g, "")
      .replace(/^\d+\.\s*/g, "")
      .trim();

    if (cleaned) dash[current].push(cleaned);
  }

  return dash;
}

export default function GameStrategistPage() {
  const [mode, setMode] = useState<Mode>("valorant");
  const [map, setMap] = useState("");
  const [agent, setAgent] = useState("");
  const [champion, setChampion] = useState("");
  const [opponent, setOpponent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState<string>(
    "Your AI Coach is analyzing the meta..."
  );

  const dashboard = useMemo(
    () => parseStrategyDashboard(resultText),
    [resultText]
  );

  const promptSummary = useMemo(() => {
    if (mode === "valorant") return `Map: ${map || "—"}, Agent: ${agent || "—"}`;
    return `Champion: ${champion || "—"}, Opponent: ${opponent || "—"}`;
  }, [mode, map, agent, champion, opponent]);

  const handleGetStrategy = async () => {
    if (isLoading) return;

    if (mode === "valorant") {
      if (!map.trim() || !agent.trim()) {
        setResultText("Please enter both 'Map' and 'Agent'.");
        return;
      }
    } else {
      if (!champion.trim() || !opponent.trim()) {
        setResultText("Please enter both 'Champion' and 'Opponent'.");
        return;
      }
    }

    setIsLoading(true);
    setResultText("Your AI Coach is analyzing the meta...");

    try {
      const res = await fetch("/api/gemini-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          map,
          agent,
          champion,
          opponent,
        }),
      });

      const data = (await res.json().catch(() => null)) as
        | { text?: string; error?: string }
        | null;

      if (!res.ok) {
        setResultText(data?.error || "Failed to generate strategy. Please try again.");
        return;
      }

      setResultText(data?.text || "No strategy text returned from Gemini.");
    } catch {
      setResultText("Network error while generating strategy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050006] text-white">
      {/* Ambient background glows (matches main portfolio styling) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -left-24 top-56 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute -right-28 top-96 h-[460px] w-[460px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_55%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-100 shadow-[0_0_35px_rgba(168,85,247,0.18)] transition hover:bg-purple-500/15"
        >
          <span aria-hidden="true">←</span> Back to Home
        </Link>

        <header className="mt-8">
          <p className="text-sm text-purple-200/80">AI Strategy Dashboard</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Valorant & LoL Coaching
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Toggle between games, fill in the details, and get a glowing, ready-to-use strategy
            outline. (Demo placeholder UI)
          </p>
        </header>

        {/* Tabs / Toggle */}
        <div className="mt-8 rounded-3xl border border-purple-500/20 bg-purple-500/10 p-1 shadow-[0_0_60px_rgba(168,85,247,0.08)]">
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => setMode("valorant")}
              className={[
                "rounded-2xl px-4 py-3 text-sm font-medium transition",
                mode === "valorant"
                  ? "bg-purple-600 text-white shadow-[0_0_35px_rgba(124,58,237,0.35)]"
                  : "bg-transparent text-white/70 hover:text-white",
              ].join(" ")}
              aria-pressed={mode === "valorant"}
            >
              Valorant
            </button>
            <button
              type="button"
              onClick={() => setMode("lol")}
              className={[
                "rounded-2xl px-4 py-3 text-sm font-medium transition",
                mode === "lol"
                  ? "bg-purple-600 text-white shadow-[0_0_35px_rgba(124,58,237,0.35)]"
                  : "bg-transparent text-white/70 hover:text-white",
              ].join(" ")}
              aria-pressed={mode === "lol"}
            >
              League of Legends
            </button>
          </div>
        </div>

        {/* Inputs */}
        <section className="mt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleGetStrategy();
            }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(168,85,247,0.05)]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-purple-200/80">
                  {mode === "valorant" ? "Valorant inputs" : "LoL inputs"}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  {mode === "valorant" ? "Pick your setup" : "Choose the match-up"}
                </h2>
              </div>
              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 px-3 py-2">
                <p className="text-xs text-purple-100/90">Prompt</p>
                <p className="mt-1 max-w-[210px] truncate text-sm font-semibold text-purple-200">
                  {promptSummary}
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {mode === "valorant" ? (
                <>
                  <label className="block">
                    <span className="text-sm text-white/70">Map</span>
                    <input
                      value={map}
                      onChange={(e) => setMap(e.target.value)}
                      placeholder="e.g., Bind, Ascent..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-white/70">Agent</span>
                    <input
                      value={agent}
                      onChange={(e) => setAgent(e.target.value)}
                      placeholder="e.g., Jett, Omen..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30"
                    />
                  </label>
                </>
              ) : (
                <>
                  <label className="block">
                    <span className="text-sm text-white/70">Champion</span>
                    <input
                      value={champion}
                      onChange={(e) => setChampion(e.target.value)}
                      placeholder="e.g., Azir, Yasuo..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-white/70">Opponent</span>
                    <input
                      value={opponent}
                      onChange={(e) => setOpponent(e.target.value)}
                      placeholder="e.g., Annie, Darius..."
                      className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/30"
                    />
                  </label>
                </>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className={[
                  "w-full rounded-3xl border border-purple-500/30 bg-purple-600 px-6 py-4 text-sm font-semibold text-white shadow-[0_0_60px_rgba(124,58,237,0.35)] transition hover:bg-purple-500",
                  isLoading ? "opacity-70 hover:bg-purple-600" : "",
                ].join(" ")}
              >
                {isLoading ? "Analyzing..." : "Get AI Strategy"}
              </button>
            </div>
          </form>

          {/* Result */}
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(168,85,247,0.05)]">
            {(!isLoading &&
              (dashboard.early.length ||
                dashboard.items.length ||
                dashboard.tips.length)) ? (
              <div className="absolute right-4 top-4 rounded-full border border-purple-500/25 bg-purple-500/10 px-3 py-1 text-[11px] font-semibold text-purple-200/90 shadow-[0_0_25px_rgba(168,85,247,0.25)]">
                AI Generated
              </div>
            ) : null}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-purple-200/80">Result</p>
                <h3 className="mt-2 text-xl font-semibold text-white">Your AI Coach</h3>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-xs text-white/60">Status</p>
                <p className="mt-1 text-sm font-semibold text-white/80">
                  {isLoading ? "Analyzing" : "Ready"}
                </p>
              </div>
            </div>

            <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-70" />

            <div className="mt-5">
              {dashboard.early.length || dashboard.items.length || dashboard.tips.length ? (
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-purple-200">
                      Erken Oyun
                    </p>
                    <ul className="mt-2 space-y-2">
                      {dashboard.early.map((b) => (
                        <li key={b} className="text-sm leading-relaxed text-white/85">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-purple-200">
                      Eşya Seçimleri
                    </p>
                    <ul className="mt-2 space-y-2">
                      {dashboard.items.map((b) => (
                        <li key={b} className="text-sm leading-relaxed text-white/85">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-purple-200">
                      Pro İpuçları
                    </p>
                    <ul className="mt-2 space-y-2">
                      {dashboard.tips.map((b) => (
                        <li key={b} className="text-sm leading-relaxed text-white/85">
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                  {resultText}
                </p>
              )}
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-white/55">
          Built with{" "}
          <span className="text-purple-200/90 font-medium">Gemini AI</span>
        </footer>
      </div>
    </main>
  );
}

