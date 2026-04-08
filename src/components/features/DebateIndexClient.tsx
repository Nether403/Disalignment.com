"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { EpistemicHygieneBadge, ClaimStatus } from "@/components/ui/epistemic-hygiene-badge"
import { ChevronDown, Users } from "lucide-react"

interface DebateItem {
  title: string
  description: string
  status: ClaimStatus
  experts: string[]
  camp: string
}

interface Tier {
  label: string
  timeframe: string
  color: string
  description: string
  items: DebateItem[]
}

interface Crux {
  question: string
  pessimistView: string
  optimistView: string
  status: string
}

interface DebateData {
  nearTerm: Tier
  mediumTerm: Tier
  longTerm: Tier
  cruxes: Crux[]
}

function campColor(camp: string) {
  if (camp === "Near-Term Focus") return "text-amber-400"
  if (camp === "Long-Term Focus") return "text-red-400"
  if (camp === "Deeply Contested" || camp === "Contested") return "text-purple-400"
  return "text-zinc-400"
}

function RiskCard({ item, accentColor }: { item: DebateItem; accentColor: string }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      layout
      className="border border-white/5 rounded-xl overflow-hidden bg-zinc-950/50 backdrop-blur-sm cursor-pointer"
      onClick={() => setOpen(!open)}
      whileHover={{ borderColor: "rgba(255,255,255,0.1)" }}
      transition={{ duration: 0.15 }}
    >
      <div className="p-5 flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <EpistemicHygieneBadge status={item.status} />
            <span className={`text-xs font-mono ${campColor(item.camp)}`}>{item.camp}</span>
          </div>
          <h4 className="text-white font-semibold leading-snug">{item.title}</h4>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 mt-0.5"
        >
          <ChevronDown className="w-4 h-4 text-zinc-600" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 border-t"
              style={{ borderColor: `${accentColor}18` }}
            >
              <p className="text-sm text-zinc-400 leading-relaxed mt-4 mb-4">
                {item.description}
              </p>
              {item.experts.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  <Users className="w-3 h-3 text-zinc-600 flex-shrink-0" />
                  <span className="text-xs text-zinc-600">Key voices:</span>
                  {item.experts.map((e) => (
                    <span
                      key={e}
                      className="text-xs px-2 py-0.5 bg-white/5 border border-white/5 rounded-full text-zinc-400"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function TierSection({ tier, index }: { tier: Tier; index: number }) {
  const [expanded, setExpanded] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border border-white/5 rounded-2xl overflow-hidden"
    >
      {/* Tier Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/2 transition-colors"
        style={{ background: `linear-gradient(90deg, ${tier.color}08, transparent)` }}
      >
        <div className="flex items-center gap-5">
          {/* Color orb */}
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{
              background: tier.color,
              boxShadow: `0 0 12px ${tier.color}60`,
            }}
          />
          <div>
            <div className="flex items-center gap-3 mb-0.5">
              <span className="text-xl font-bold text-white">{tier.label}</span>
              <span
                className="text-xs font-mono px-2 py-0.5 rounded-full border"
                style={{
                  color: tier.color,
                  borderColor: `${tier.color}40`,
                  background: `${tier.color}12`,
                }}
              >
                {tier.timeframe}
              </span>
            </div>
            <p className="text-sm text-zinc-500">{tier.description}</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-5 h-5 text-zinc-600" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 grid gap-3">
              {tier.items.map((item) => (
                <RiskCard key={item.title} item={item} accentColor={tier.color} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function CruxCard({ crux, index }: { crux: Crux; index: number }) {
  const [side, setSide] = useState<"pessimist" | "optimist" | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="p-6 border border-white/5 rounded-xl bg-zinc-950/50"
    >
      <p className="text-xs font-mono text-zinc-500 tracking-widest uppercase mb-3">
        Core Crux #{index + 1}
      </p>
      <h4 className="text-white font-semibold mb-5 leading-snug">{crux.question}</h4>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setSide(side === "pessimist" ? null : "pessimist")}
          className={`p-4 rounded-lg border text-left transition-all duration-200 ${
            side === "pessimist"
              ? "border-red-800/60 bg-red-950/20"
              : "border-white/5 bg-black/30 hover:border-white/10"
          }`}
        >
          <div className="text-xs font-mono text-red-400 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Long-Term Camp
          </div>
          <AnimatePresence mode="wait">
            {side === "pessimist" ? (
              <motion.p
                key="revealed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-zinc-300 leading-relaxed"
              >
                {crux.pessimistView}
              </motion.p>
            ) : (
              <motion.p
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-zinc-600"
              >
                Tap to reveal position →
              </motion.p>
            )}
          </AnimatePresence>
        </button>

        <button
          onClick={() => setSide(side === "optimist" ? null : "optimist")}
          className={`p-4 rounded-lg border text-left transition-all duration-200 ${
            side === "optimist"
              ? "border-amber-800/60 bg-amber-950/20"
              : "border-white/5 bg-black/30 hover:border-white/10"
          }`}
        >
          <div className="text-xs font-mono text-amber-400 mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            Near-Term Camp
          </div>
          <AnimatePresence mode="wait">
            {side === "optimist" ? (
              <motion.p
                key="revealed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-zinc-300 leading-relaxed"
              >
                {crux.optimistView}
              </motion.p>
            ) : (
              <motion.p
                key="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-zinc-600"
              >
                Tap to reveal position →
              </motion.p>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  )
}

export function DebateIndexClient({ data }: { data: DebateData }) {
  const tiers = [data.nearTerm, data.mediumTerm, data.longTerm]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* The Risk Spectrum Visual */}
      <div className="mb-16">
        <div className="flex items-center gap-0 rounded-full overflow-hidden h-3 mb-4">
          <div className="flex-1 h-full" style={{ background: "#d97706" }} />
          <div className="flex-1 h-full" style={{ background: "#7c3aed" }} />
          <div className="flex-1 h-full" style={{ background: "#dc2626" }} />
        </div>
        <div className="flex justify-between text-xs font-mono text-zinc-600">
          <span>Near-Term (Now)</span>
          <span>Medium-Term (5–15y)</span>
          <span>Existential (15y+)</span>
        </div>
      </div>

      {/* The Legend */}
      <div className="flex flex-wrap gap-4 mb-12 p-4 border border-white/5 rounded-xl bg-zinc-950/30">
        <div className="text-xs text-zinc-600 font-mono uppercase tracking-widest self-center mr-2">Camps:</div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span className="text-xs text-amber-400">Near-Term Focus — fix today's harms</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-xs text-red-400">Long-Term Focus — prevent existential risk</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <span className="text-xs text-purple-400">Contested — experts sharply divided</span>
        </div>
      </div>

      {/* Tier Sections */}
      <div className="space-y-4 mb-20">
        {tiers.map((tier, i) => (
          <TierSection key={tier.label} tier={tier} index={i} />
        ))}
      </div>

      {/* Cruxes Section */}
      <div className="mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-white/5 flex-grow" />
          <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase whitespace-nowrap">
            Core Cruxes — Where experts fundamentally disagree
          </span>
          <div className="h-px bg-white/5 flex-grow" />
        </div>
        <p className="text-sm text-zinc-500 mb-8 max-w-2xl">
          A crux is a single factual or philosophical question where you and an
          opponent genuinely disagree—and where, if you changed your belief on
          that one question, you would update your entire position. These are the
          load-bearing walls of the alignment debate.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {data.cruxes.map((crux, i) => (
          <CruxCard key={i} crux={crux} index={i} />
        ))}
      </div>
    </div>
  )
}
