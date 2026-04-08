"use client"

import { motion } from "framer-motion"
import { CitationTooltip } from "@/components/ui/citation-tooltip"

interface CaseFileData {
  id: string
  title: string
  date: string
  incident: string
  description: string
  alignmentFailure: string
  status: string
}

export function CaseFileCard({ data, index }: { data: CaseFileData, index: number }) {
  // Utility to replace specific terms with tooltips within the text
  const applyTooltips = (text: string) => {
    // We can do standard substitution. 
    // To keep it simple, we highlight "Reward Hacking" or "Waluigi Effect" if they exist.
    // For production, maybe a more robust regex-based parser, but this is fine for the prototype.
    const parts = text.split(/(Reward Hacking|Waluigi Effect|Goal Misgeneralization|Multipolar Trap|Instrumental Convergence)/i)
    
    return parts.map((part, i) => {
      const match = part.toLowerCase()
      if (
        match === "reward hacking" || 
        match === "waluigi effect" || 
        match === "goal misgeneralization" ||
        match === "multipolar trap" ||
        match === "instrumental convergence"
      ) {
        return <CitationTooltip key={i} term={part}>{part}</CitationTooltip>
      }
      return part
    })
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 p-8 border border-zinc-800 bg-zinc-950/50 hover:bg-zinc-900/50 transition-colors"
    >
      {/* Top right classification */}
      <div className="absolute top-4 right-4 text-[10px] font-mono text-zinc-600 border border-zinc-800 px-2 py-1 uppercase tracking-widest bg-black">
        Status: <span className={data.status === "Archived" ? "text-zinc-400" : "text-amber-500"}>{data.status}</span>
      </div>

      <div className="flex flex-col gap-2 pt-2 border-l border-zinc-800 pl-4 md:border-none md:pl-0">
        <span className="text-sm font-mono text-zinc-500">{data.date}</span>
        <h3 className="text-xl font-serif text-zinc-200">{data.title}</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">Incident</span>
          <p className="text-base font-medium text-white">{data.incident}</p>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600">Description</span>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="space-y-2 p-4 bg-black/50 border border-zinc-800/50">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">Alignment Failure</span>
          <p className="text-sm text-zinc-300 leading-relaxed font-serif">
            {applyTooltips(data.alignmentFailure)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
