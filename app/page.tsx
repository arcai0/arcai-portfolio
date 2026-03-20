import TerminalWidget from "@/components/TerminalWidget";
import ScriptShowcase from "@/components/ScriptShowcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20 pb-20 px-4 bg-black text-white selection:bg-purple-500/30">
      {/* Hero Section: Karakterli ve Sade */}
      <div className="text-center max-w-2xl w-full mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 animate-in fade-in slide-in-from-top-4 duration-1000">
          arcai
        </h1>
        <h2 className="text-xl md:text-2xl text-purple-400 mb-6 font-semibold tracking-tight">
          I build cool web apps and still rank up.
        </h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          I ship clean Node.js and Next.js apps. When I&apos;m not pushing code, 
          I&apos;m usually building tools for competitive games or exploring AI integrations. 
          No fluff, just high-performance builds.
        </p>
      </div>

      {/* Terminal Section: İnteraktif Yazılımcı Üssü */}
      <div className="w-full max-w-3xl mb-24 drop-shadow-[0_0_15px_rgba(168,85,247,0.15)]">
        <TerminalWidget />
      </div>

      {/* Script Vault: İşe Yarayan Araçlar */}
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-[1px] w-12 bg-zinc-800"></div>
          <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.3em]">
            // Script Vault
          </h2>
          <div className="h-[1px] w-12 bg-zinc-800"></div>
        </div>
        
        <ScriptShowcase />
      </div>
    </main>
  );
}