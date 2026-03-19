import React from "react";

export default function HomePage() {
  const projects = [
    {
      title: "AI Game Strategist",
      description:
        "A specialized tool that generates winning builds and tactics for competitive games using Gemini AI.",
      tags: ["Next.js", "Node", "RAG", "Postgres"],
      links: {
        live: "/game-strategist",
        repo: "/game-strategist",
        demo: "/game-strategist",
      },
    },
    {
      title: "Smart Analytics Dashboard",
      description:
        "A full-stack analytics dashboard featuring role-based access, interactive charts, and scheduled data pipelines.",
      tags: ["React", "TypeScript", "Charts", "ETL"],
      links: {
        live: "/game-strategist",
        repo: "/game-strategist",
      },
    },
    {
      title: "Recommendation Engine",
      description:
        "Personalized recommendations powered by event tracking, feature engineering, and an API designed for low-latency reads.",
      tags: ["Python", "APIs", "Caching", "ML"],
      links: {
        live: "/game-strategist",
        repo: "/game-strategist",
      },
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050006] text-white">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -left-24 top-56 h-[420px] w-[420px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute -right-28 top-96 h-[460px] w-[460px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_55%)]" />
      </div>

      {/* Page content */}
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl border border-purple-500/20 bg-purple-500/10 shadow-[0_0_0_1px_rgba(168,85,247,0.15),0_0_30px_rgba(168,85,247,0.22)]">
              <span className="text-lg font-bold text-purple-200">A</span>
              <span className="pointer-events-none absolute -inset-2 rounded-2xl bg-purple-400/10 blur-md" />
            </div>
            <div className="leading-tight">
              <p className="text-sm text-white/70">Arcan</p>
              <p className="text-xs text-purple-200/80">AI-Powered Full Stack Developer</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 sm:flex">
            <a
              className="text-sm text-white/70 transition hover:text-white"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="text-sm text-white/70 transition hover:text-white"
              href="#about"
            >
              About
            </a>
            <a
              className="text-sm text-white/70 transition hover:text-white"
              href="#contact"
            >
              Contact
            </a>
          </nav>

          <div className="hidden sm:block">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-100 shadow-[0_0_35px_rgba(168,85,247,0.18)] transition hover:bg-purple-500/15"
            >
              Let&apos;s build
            </a>
          </div>
        </header>

        {/* Hero */}
        <section className="mt-12 sm:mt-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs text-purple-200/90 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <span className="h-2 w-2 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />
                Available for freelance & full-time
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Arcan
                <span className="block bg-gradient-to-r from-purple-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  AI-Powered Full Stack Developer
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                I design and build production-grade web applications with a focus on
                performance, clean architecture, and AI-enhanced user experiences.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white shadow-[0_0_35px_rgba(124,58,237,0.35)] transition hover:bg-purple-500"
                >
                  View projects
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  Contact me
                  <span aria-hidden="true">↗</span>
                </a>
              </div>

              {/* Quick stats */}
              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {[
                  { k: "8+", v: "Years building" },
                  { k: "20+", v: "Ships to prod" },
                  { k: "RAG", v: "AI workflows" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-[0_0_45px_rgba(168,85,247,0.08)]"
                  >
                    <div className="text-lg font-semibold text-purple-200">
                      {s.k}
                    </div>
                    <div className="mt-1 text-sm text-white/65">{s.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero card */}
            <div className="relative">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-b from-purple-500/25 via-purple-500/10 to-transparent blur" />
              <div className="relative rounded-3xl border border-purple-500/20 bg-[#07000a]/70 p-6 shadow-[0_0_60px_rgba(168,85,247,0.18)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/70">Focus</p>
                    <h2 className="mt-1 text-xl font-semibold text-white">
                      AI-ready full stack
                    </h2>
                  </div>
                  <div className="rounded-2xl border border-purple-500/20 bg-purple-500/10 px-3 py-2">
                    <p className="text-xs text-purple-100/90">Signal</p>
                    <p className="text-sm font-semibold text-purple-200">High</p>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {[
                    "Modern React + TypeScript UI",
                    "API design with reliability in mind",
                    "Database modeling + performance tuning",
                    "AI integrations (RAG, tools, evaluation)",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-purple-500/15 text-purple-200 shadow-[0_0_25px_rgba(168,85,247,0.35)]">
                        ✓
                      </span>
                      <p className="text-sm text-white/80">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-white/60">Current availability</p>
                  <p className="mt-1 text-sm font-medium text-white/80">
                    Taking new projects for the next cycle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mt-16 scroll-mt-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm text-purple-200/80">Selected work</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Projects that ship real value
              </h2>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm text-white/60">
                Clean UX, scalable backends, measurable outcomes.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_0_60px_rgba(168,85,247,0.08)] transition hover:border-purple-500/30"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-purple-500/15 blur-xl transition group-hover:opacity-100 opacity-70" />

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      {p.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs text-purple-100/90"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <a
                    href={p.links.live}
                    className="inline-flex flex-1 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                  >
                    Live
                  </a>
                  <a
                    href={p.links.repo}
                    className="inline-flex flex-1 items-center justify-center rounded-2xl bg-purple-600/20 px-3 py-2 text-sm font-medium text-purple-100 transition hover:bg-purple-600/30"
                  >
                    Repo
                  </a>
                  {p.links.demo ? (
                    <a
                      href={p.links.demo}
                      className="inline-flex items-center justify-center rounded-2xl border border-purple-500/25 bg-purple-500/10 px-3 py-2 text-xs font-medium text-purple-100 transition hover:bg-purple-500/15"
                    >
                      Demo
                    </a>
                  ) : null}
                </div>

                <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-60" />

                <div className="mt-3 flex items-center justify-between text-xs text-white/60">
                  <span className="group-hover:text-purple-200 transition">
                    Built for production
                  </span>
                  <span className="text-white/45">2026-ready</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mt-16 scroll-mt-24">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-purple-200/80">About</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Engineering with clarity and velocity
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/75 sm:text-base">
                A resilient developer focused on building AI-driven solutions that
                solve real-world problems.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["TypeScript", "Next.js", "APIs", "Postgres", "RAG", "Testing"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-white/5 p-6">
              <p className="text-sm text-purple-200/80">How I work</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                Ship, measure, iterate
              </h2>
              <div className="mt-5 space-y-3">
                {[
                  {
                    title: "Design for real constraints",
                    body: "Performance budgets, DX, and maintainability from day one.",
                  },
                  {
                    title: "Build with observability",
                    body: "Logging, metrics, and predictable error handling.",
                  },
                  {
                    title: "Validate with feedback",
                    body: "User signals and AI evaluation loops to improve quality.",
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-sm font-medium text-white">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">
                      {step.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mt-16 scroll-mt-24">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm text-purple-200/80">Contact</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Let&apos;s create something exceptional
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
                  Tell me what you&apos;re building. I&apos;ll respond with a clear plan,
                  timelines, and next steps.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:hello@example.com"
                  className="inline-flex items-center justify-center rounded-xl bg-purple-600 px-5 py-3 text-sm font-medium text-white shadow-[0_0_35px_rgba(124,58,237,0.35)] transition hover:bg-purple-500"
                >
                  Email me
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  See work again
                </a>
              </div>
            </div>
            <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-purple-500/30 to-transparent opacity-70" />
            <p className="mt-5 text-xs text-white/55">
              Copyright {new Date().getFullYear()} Arcan. Crafted with Tailwind CSS and purple-glow energy.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

