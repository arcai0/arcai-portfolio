"use client";

import { useState } from "react";

type ToolCard = {
  id: string;
  name: string;
  brief: string;
  codeUrl: string;
  installCommand: string;
};

const TOOLS: ToolCard[] = [
  {
    id: "ai-tactical-engine",
    name: "AI Tactical Engine",
    brief: "Real-time data analysis for competitive games",
    codeUrl: "https://github.com/arcai/ai-tactical-engine",
    installCommand: "npm install ai-tactical-engine",
  },
  {
    id: "nextjs-boilerplate",
    name: "Next.js Boilerplate",
    brief: "High-performance starter kit for SaaS",
    codeUrl: "https://github.com/arcai/nextjs-boilerplate",
    installCommand: "npx create-next-app@latest my-saas --example boilerplate",
  },
  {
    id: "git-automator",
    name: "Git Automator",
    brief: "Python script to manage large repo deployments",
    codeUrl: "https://github.com/arcai/git-automator",
    installCommand: "pip install git-automator",
  },
];

export default function ScriptShowcase() {
  const [copiedToolId, setCopiedToolId] = useState<string | null>(null);

  const handleCopy = async (toolId: string, command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedToolId(toolId);
      setTimeout(() => {
        setCopiedToolId((current) => (current === toolId ? null : current));
      }, 1400);
    } catch {
      setCopiedToolId(null);
    }
  };

  return (
    <section className="w-full rounded-2xl border border-zinc-900 bg-zinc-950 p-6 sm:p-8">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Vault</p>
        <h2 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
          Script Showcase
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Minimal, production-focused tools directory.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {TOOLS.map((tool) => (
          <article
            key={tool.id}
            className="group rounded-xl border border-zinc-900 bg-zinc-950/80 p-5 transition hover:border-violet-900"
          >
            <h3 className="text-base font-semibold text-white">{tool.name}</h3>
            <p className="mt-2 min-h-12 text-sm leading-relaxed text-zinc-400">
              {tool.brief}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <a
                href={tool.codeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-200 transition hover:border-violet-900 hover:text-white"
              >
                View Code
              </a>
              <button
                type="button"
                onClick={() => handleCopy(tool.id, tool.installCommand)}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 transition hover:border-violet-900 hover:text-white"
              >
                {copiedToolId === tool.id
                  ? "Copied"
                  : "Copy Install Command"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

