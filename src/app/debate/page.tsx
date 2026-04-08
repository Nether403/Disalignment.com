import { Navbar } from "@/components/layout/Navbar"
import { DebateIndexClient } from "@/components/features/DebateIndexClient"
import { ChangelogBlock } from "@/components/ui/changelog-block"
import { CitationTooltip } from "@/components/ui/citation-tooltip"
import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Debate Index — Disalignment.com",
  description:
    "A structured map of expert disagreement in AI alignment. From near-term bias and deepfakes to existential instrumental convergence—without culture-war toxicity.",
}

async function getDebateData() {
  const filePath = path.join(process.cwd(), "content", "debate-index.json")
  const data = await fs.readFile(filePath, "utf-8")
  return JSON.parse(data)
}

export default async function DebatePage() {
  const data = await getDebateData()

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        {/* Spectrum gradient background glow */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: "#d97706" }} />
          <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-6"
            style={{ background: "#9333ea" }} />
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-8"
            style={{ background: "#dc2626" }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <a
              href="/"
              className="text-xs font-mono text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              ← Disalignment.com
            </a>
            <div className="h-px bg-white/5 flex-grow" />
            <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase">
              Chapter 03_
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-300 to-zinc-600">
            The Debate Index
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed mb-6">
            A structured map of where experts genuinely disagree—from
            near-term bias and deepfakes all the way to existential
            <CitationTooltip>instrumental convergence</CitationTooltip>. No culture-war framing. No straw-manning.
            Just the cruxes.
          </p>

          {/* Meta info strip */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-zinc-600 border-t border-white/5 pt-6">
            <span>
              <span className="text-zinc-500">Source:</span> NotebookLM — Disalignment.com: A Field Guide (33 sources)
            </span>
            <span>
              <span className="text-zinc-500">Positions mapped:</span> 3 tiers · 10 issues · 3 core cruxes
            </span>
            <span>
              <span className="text-zinc-500">Tone:</span> Forensic, not polemical
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 pt-16">
          <DebateIndexClient data={data} />

          <ChangelogBlock
            entries={[
              {
                updated: "2026-04-07",
                change: "Initial publication of Debate Index covering 10 risk areas across 3 tiers.",
                reason: "Mapping the discourse landscape without cultural-war framing.",
                source: "NotebookLM — Disalignment.com: A Field Guide to AI Alignment Architecture",
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
