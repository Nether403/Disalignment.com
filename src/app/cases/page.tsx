import { Navbar } from "@/components/layout/Navbar"
import { CaseFileCard } from "@/components/cases/CaseFileCard"
import { ChangelogBlock } from "@/components/ui/changelog-block"
import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Case Files — Disalignment.com",
  description: "Forensic analysis of historical AI alignment failures. Real-world precedents of specification gaming, deceptive alignment, and multipolar traps.",
}

async function getCaseData() {
  const filePath = path.join(process.cwd(), "content", "case-files.json")
  const data = await fs.readFile(filePath, "utf-8")
  return JSON.parse(data)
}

export default async function CaseFilesPage() {
  const cases = await getCaseData()

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
           {/* Noir atmospheric glow */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
            style={{ background: "radial-gradient(ellipse, #3f3f46, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <a href="/" className="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors">
              ← Disalignment.com
            </a>
            <div className="h-px bg-white/5 flex-grow" />
            <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase">Chapter 01_</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600">
            The Case Files
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-6">
            We tend to view AI failures as "bugs" to be patched. But what if they are previews? 
            These are the forensic records of systems operating exactly as programmed, but disastrously 
            misaligned with human intent.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-600 border-t border-white/5 pt-6">
            <span><span className="text-zinc-500">Framework:</span> Historical empiricism</span>
            <span><span className="text-zinc-500">Subject:</span> Real-world proxy gaming and systemic resonance</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 pt-16">
          
          <div className="flex flex-col gap-6 mb-24">
            {cases.map((caseData: any, i: number) => (
              <CaseFileCard key={caseData.id} data={caseData} index={i} />
            ))}
          </div>

          <ChangelogBlock
            entries={[
              {
                updated: "2026-04-08",
                change: "Published initial batch of historical AI alignment failures.",
                source: "NotebookLM — Disalignment.com: AI Failure Modes Archive (11 sources)",
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
