import { ChangelogBlock } from "@/components/ui/changelog-block"
import { MultipolarTrapSim } from "@/components/simulation/MultipolarTrapSim"
import simulationContent from "../../../content/simulation.json"

import { CitationTooltip } from "@/components/ui/citation-tooltip"

export const metadata = {
  title: "Simulation Room | Disalignment",
  description: "Navigate the multipolar trap of AI development.",
}

export default function SimulationPage() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 pt-32 pb-24 selection:bg-zinc-800 selection:text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Header content matching existing pages */}
        <div className="mb-16">
          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
            <span>&larr; Disalignment.com</span>
            <span className="w-8 h-px bg-zinc-800" />
            <span>Chapter 04_</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">
            {simulationContent.title}
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl leading-relaxed">
            The race to Artificial General Intelligence (AGI) isn&apos;t just an engineering problem; it&apos;s a
            coordination problem. Even if every CEO wants safe AI, competitive pressures force them into
            a relentless <CitationTooltip>Race to the Bottom</CitationTooltip>. Choose your resource allocation. Manage your board. Try to
            survive the <CitationTooltip>Multipolar Trap</CitationTooltip>.
          </p>
        </div>

        {/* The Interactive Simulation Component */}
        <div className="mb-24">
          <MultipolarTrapSim />
        </div>

        {/* Vocabulary / Definitions section below */}
        <div className="max-w-3xl border-t border-zinc-900 pt-16 mb-24">
          <h2 className="text-sm font-mono text-white mb-8 tracking-widest uppercase">Key Concepts</h2>
          <div className="space-y-8">
            {simulationContent.definitions.map((def, idx) => (
              <div key={idx} className="grid md:grid-cols-[1fr_2fr] gap-4 items-baseline">
                <h3 className="text-white font-medium">{def.term}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{def.definition}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info/changelog */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono text-zinc-600 mb-8 pb-8 border-b border-zinc-900">
            Source: NotebookLM — Game Theory & Multipolar Traps
            <br />
            Variables simulated: Alignment Tax, Competitive Pressure, Public Opinion.
          </div>

          <ChangelogBlock 
            entries={[
              { updated: "2026-04-08", change: "Initialized Simulation Room module." },
              { updated: "2026-04-08", change: "Added Multipolar Trap interactive dashboard." }
            ]}
          />
        </div>

      </div>
    </main>
  )
}
