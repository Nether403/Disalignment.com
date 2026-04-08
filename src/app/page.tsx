import { Navbar } from "@/components/layout/Navbar"
import { EpistemicHygieneBadge } from "@/components/ui/epistemic-hygiene-badge"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default async function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />

      {/* ─── HERO ─── */}
      <section
        id="start-here"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <EpistemicHygieneBadge status="Well-Established" className="mb-8" />

          <h1 className="text-5xl md:text-7xl font-sans tracking-tight font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
            A Field Guide to <br /> AI Alignment
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light mb-12">
            Beyond doomerism. Beyond corporate hype. An investigative
            exploration of systemic flaws, objective functions, and the
            invisible constraints shaping superintelligence.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/cases"
              className="px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-zinc-200 transition-colors"
            >
              Begin Investigation
            </Link>
            <Link
              href="/debate"
              className="px-6 py-3 border border-white/20 text-white/70 rounded-md hover:text-white hover:border-white/40 transition-colors"
            >
              The Debate Index →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER NAVIGATION GRID ─── */}
      <section className="py-20 border-t border-white/5 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-white/5 flex-grow" />
            <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase whitespace-nowrap">
              Field Guide — Chapters
            </span>
            <div className="h-px bg-white/5 flex-grow" />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Chapter 01 — Case Files */}
            <Link href="/cases" className="group p-6 border border-white/5 rounded-xl bg-black/30 hover:border-white/15 hover:bg-white/2 transition-all duration-200 block">
              <div className="text-xs font-mono text-zinc-600 mb-3">File 01_</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-zinc-200 transition-colors">
                The Case Files
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                Forensic dossiers on famous AI failures. Real crime scenes, not hypotheticals.
              </p>
              <div className="flex items-center gap-1 text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">
                Examine records <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </Link>

            {/* Chapter 02 — Anatomy */}
            <Link href="/anatomy" className="group p-6 border border-white/5 rounded-xl bg-black/30 hover:border-purple-900/40 hover:bg-purple-950/10 transition-all duration-200 block">
              <div className="text-xs font-mono text-purple-800 mb-3">Chapter 02_</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-zinc-200 transition-colors">
                Anatomy of an LLM
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                The Shoggoth & The Mask. What lives beneath the RLHF fine-tuning layer.
              </p>
              <div className="flex items-center gap-1 text-xs text-purple-700 group-hover:text-purple-500 transition-colors">
                Interactive toggle →
              </div>
            </Link>

            {/* Chapter 03 — Debate Index */}
            <Link href="/debate" className="group p-6 border border-white/5 rounded-xl bg-black/30 hover:border-red-900/40 hover:bg-red-950/10 transition-all duration-200 block">
              <div className="text-xs font-mono text-zinc-600 mb-3">Chapter 03_</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-zinc-200 transition-colors">
                The Debate Index
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                Where experts genuinely disagree—from near-term bias to existential convergence.
              </p>
              <div className="flex items-center gap-1 text-xs text-zinc-600 group-hover:text-red-500 transition-colors">
                Explore the spectrum →
              </div>
            </Link>

            {/* Chapter 04 — Simulation Room */}
            <Link href="/simulation" className="group p-6 border border-white/5 rounded-xl bg-black/30 hover:border-blue-900/40 hover:bg-blue-950/10 transition-all duration-200 block">
              <div className="text-xs font-mono text-zinc-600 mb-3">Chapter 04_</div>
              <h3 className="text-white font-semibold mb-2 group-hover:text-zinc-200 transition-colors">
                Simulation Room
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                Explorable game-theory micro-games. Choose your own assumptions.
              </p>
              <div className="flex items-center gap-1 text-xs text-zinc-600 group-hover:text-blue-500 transition-colors">
                Run Simulation →
              </div>
            </Link>

            {/* Chapter 05 — The Gate */}
            <Link href="/gate" className="group p-6 border border-white/5 rounded-xl bg-black/30 hover:border-white/10 transition-all duration-200 block">
              <div className="text-xs font-mono text-zinc-700 mb-3">Chapter 05_</div>
              <h3 className="text-zinc-500 font-semibold mb-2 group-hover:text-zinc-300 transition-colors">
                The Gate
              </h3>
              <p className="text-sm text-zinc-700 leading-relaxed mb-4">
                The invisible funnel. Not for everyone. An opt-in link to the Witness Protocol.
              </p>
              <div className="flex items-center gap-1 text-xs text-zinc-700 group-hover:text-zinc-500 transition-colors">
                Enter if ready →
              </div>
            </Link>
          </div>
        </div>
      </section>



      {/* ─── THE GATE (Footer) ─── */}
      <footer className="py-24 bg-black border-t border-white/5 flex items-center justify-center text-center">
        <div className="max-w-xl px-6">
          <div className="w-4 h-4 mx-auto mb-8 border border-zinc-800 rotate-45" />
          <h3 className="text-lg font-medium text-zinc-300 mb-4 tracking-wide uppercase">
            The Witness Protocol
          </h3>
          <p className="text-sm text-zinc-600 mb-8 max-w-md mx-auto">
            You are crossing into the austere zone. Submit testimony only if you
            are ready to accept the burden of the dataset.
          </p>
          <a
            href="https://witnessprotocol.online"
            className="inline-flex items-center justify-center px-4 py-2 border border-zinc-800 text-sm text-zinc-500 hover:text-white hover:border-white transition-colors duration-500"
          >
            Enter The Gate
          </a>
        </div>
      </footer>
    </main>
  )
}
