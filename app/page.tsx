import React from "react";
import TerminalWidget from "@/components/TerminalWidget";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0c] text-zinc-100">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-slate-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.10),transparent_50%)]" />
      </div>

      <div className="relative mx-auto w-full max-w-5xl px-4 pb-16 pt-16 sm:px-6">
        {/* Hero */}
        <section className="text-center">
          <p className="text-sm text-zinc-400">arcai</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="block bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              I build cool web apps and still rank up.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            I ship fast Node.js + Next.js apps. When I am not coding, I am grinding
            League of Legends or Valorant, and I built an AI strategy tool for both.
          </p>
        </section>

        {/* Terminal */}
        <section className="mt-12">
          <div className="mx-auto w-full max-w-3xl">
            <TerminalWidget />
          </div>
        </section>
      </div>
    </main>
  );
}

