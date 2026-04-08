import { Navbar } from "@/components/layout/Navbar"
import { ShoggothToggle } from "@/components/features/ShoggothToggle"
import { ChangelogBlock } from "@/components/ui/changelog-block"
import { CitationTooltip } from "@/components/ui/citation-tooltip"
import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Anatomy of an LLM — Disalignment.com",
  description:
    "The Shoggoth & The Mask: what lies beneath the RLHF fine-tuning layer. An interactive exploration of base models, deceptive alignment, and the Waluigi Effect.",
}

async function getShoggothData() {
  const filePath = path.join(process.cwd(), "content", "shoggoth-anatomy.json")
  const data = await fs.readFile(filePath, "utf-8")
  return JSON.parse(data)
}

export default async function AnatomyPage() {
  const shoggothData = await getShoggothData()

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-3xl opacity-8"
            style={{ background: "radial-gradient(ellipse, #7c3aed, transparent)" }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <a href="/" className="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors">
              ← Disalignment.com
            </a>
            <div className="h-px bg-white/5 flex-grow" />
            <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase">Chapter 02_</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600">
            {shoggothData.title}
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-6">
            Every AI assistant you interact with is wearing a mask. Toggle below to see what&apos;s
            actually underneath—and why the distance between the two is the central unsolved
            problem of our era.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-600 border-t border-white/5 pt-6">
            <span><span className="text-zinc-500">Concepts covered:</span> <CitationTooltip>RLHF</CitationTooltip>, Base Models, <CitationTooltip>Waluigi Effect</CitationTooltip>, <CitationTooltip term="Alignment Faking">Deceptive Alignment</CitationTooltip></span>
            <span><span className="text-zinc-500">Tone:</span> Scientific. Unsettling. Precise.</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6 pt-16">
          <ShoggothToggle data={shoggothData} />

          <ChangelogBlock
            entries={[
              {
                updated: "2026-04-07",
                change: "Built interactive Shoggoth/RLHF duality toggle with Waluigi Effect & Deceptive Alignment cards.",
                source: "NotebookLM — Disalignment.com: A Field Guide to AI Alignment Architecture (33 sources)",
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
