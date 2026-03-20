import TerminalWidget from "@/components/TerminalWidget";
import ScriptShowcase from "@/components/ScriptShowcase";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20 pb-20 px-4 bg-black text-white">
      {/* Başlık ve Açıklama */}
      <div className="text-center max-w-2xl w-full mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          arcai
        </h1>
        <h2 className="text-xl md:text-2xl text-purple-400 mb-6 font-semibold">
          I build cool web apps and still rank up.
        </h2>
        <p className="text-zinc-400 leading-relaxed">
          I ship fast Node.js and Next.js apps. When I&apos;m not pushing code, 
          I&apos;m usually building tools for competitive games or exploring AI integrations. 
          No fluff, just high-performance builds.
        </p>
      </div>

      {/* Hacker Terminali */}
      <div className="w-full max-w-3xl mb-20">
        <TerminalWidget />
      </div>

      {/* Script Vault */}
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