"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { EpistemicHygieneBadge } from "@/components/ui/epistemic-hygiene-badge"

type State = "masked" | "revealed"

interface ClaimData {
  text: string
  status: "Well-Established" | "Emerging Evidence" | "Speculative"
}

interface AnatomyData {
  title: string
  subtitle: string
  states: {
    masked: {
      label: string
      sublabel: string
      description: string
      technicalNote: string
      claims: ClaimData[]
    }
    revealed: {
      label: string
      sublabel: string
      description: string
      technicalNote: string
      claims: ClaimData[]
    }
  }
  waluigi: { title: string; description: string; status: string }
  deceptiveAlignment: { title: string; description: string; status: string }
}

interface ShoggothToggleProps {
  data: AnatomyData
}

export function ShoggothToggle({ data }: ShoggothToggleProps) {
  const [viewState, setViewState] = useState<State>("masked")
  const isRevealed = viewState === "revealed"

  const currentState = data.states[viewState]

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Toggle Control */}
      <div className="flex items-center justify-center mb-16">
        <div className="relative flex items-center bg-zinc-950 border border-white/10 rounded-full p-1">
          {/* Sliding indicator */}
          <motion.div
            layout
            className="absolute top-1 bottom-1 rounded-full"
            style={{
              width: "calc(50% - 4px)",
              background: isRevealed
                ? "linear-gradient(135deg, #4c1d95, #7c3aed)"
                : "linear-gradient(135deg, #78350f, #d97706)",
              left: isRevealed ? "calc(50% + 2px)" : "4px",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 35 }}
          />
          <button
            onClick={() => setViewState("masked")}
            className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 ${
              !isRevealed ? "text-amber-100" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            😊 The Smiley Face
          </button>
          <button
            onClick={() => setViewState("revealed")}
            className={`relative z-10 px-6 py-2.5 text-sm font-medium rounded-full transition-colors duration-300 ${
              isRevealed ? "text-purple-100" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            👁 The Shoggoth
          </button>
        </div>
      </div>

      {/* Main Visual Stage */}
      <div className="relative rounded-2xl overflow-hidden border border-white/5 mb-8" style={{ minHeight: "420px" }}>
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="masked"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              {/* Smiley Face State */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-zinc-950 to-black" />
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]" />

              <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-12 p-10 md:p-16">
                {/* Giant Smiley */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div
                      className="w-40 h-40 md:w-56 md:h-56 rounded-full flex items-center justify-center text-7xl md:text-9xl shadow-2xl"
                      style={{
                        background:
                          "radial-gradient(circle at 35% 35%, #fde68a, #f59e0b, #d97706)",
                        boxShadow:
                          "0 0 60px rgba(245, 158, 11, 0.3), 0 0 120px rgba(245, 158, 11, 0.1)",
                      }}
                    >
                      😊
                    </div>
                    {/* "RLHF" label tag */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-900/80 border border-amber-700/50 text-amber-300 text-xs font-mono px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
                      RLHF Fine-Tuning Layer
                    </div>
                  </motion.div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-left">
                  <p className="text-sm font-mono text-amber-400/70 tracking-widest uppercase mb-3">
                    {currentState.sublabel}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {currentState.label}
                  </h3>
                  <p className="text-zinc-300 leading-relaxed mb-6">{currentState.description}</p>
                  <div className="p-4 bg-amber-950/20 border border-amber-900/30 rounded-lg">
                    <p className="text-xs font-mono text-amber-500 uppercase tracking-widest mb-2">Technical Note</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{currentState.technicalNote}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="revealed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {/* Shoggoth State */}
              <div className="absolute inset-0 bg-black" />
              {/* Shoggoth bg image */}
              <div className="absolute inset-0 opacity-30">
                <Image
                  src="/shoggoth-revealed.png"
                  alt="The Shoggoth - raw base model"
                  fill
                  className="object-cover"
                  style={{ filter: "saturate(0.5) brightness(0.6)" }}
                />
              </div>
              {/* Dark overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

              <div className="relative z-10 h-full flex flex-col md:flex-row items-center gap-12 p-10 md:p-16">
                {/* Shoggoth Visual */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{
                      scale: [1, 1.04, 0.97, 1.02, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative w-40 h-40 md:w-56 md:h-56"
                  >
                    {/* Pulsing rings */}
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute inset-0 rounded-full border border-purple-500/20"
                        animate={{ scale: [1, 1.8 + i * 0.4], opacity: [0.4, 0] }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-5xl"
                      style={{
                        background:
                          "radial-gradient(circle at 40% 40%, #1e0a3c, #0d0118, #000)",
                        boxShadow:
                          "0 0 60px rgba(139, 92, 246, 0.2), 0 0 120px rgba(139, 92, 246, 0.08), inset 0 0 40px rgba(139, 92, 246, 0.1)",
                      }}
                    >
                      {/* Many Eyes */}
                      <div className="grid grid-cols-3 gap-1.5">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-3 h-3 rounded-full bg-purple-400"
                            animate={{
                              opacity: [0.3, 1, 0.5, 0.8, 0.3],
                              scale: [0.8, 1.3, 0.9, 1.1, 0.8],
                            }}
                            transition={{
                              duration: 2 + Math.random() * 2,
                              repeat: Infinity,
                              delay: Math.random() * 1.5,
                            }}
                            style={{
                              boxShadow: "0 0 6px rgba(167, 139, 250, 0.8)",
                              background:
                                i % 3 === 0
                                  ? "#a78bfa"
                                  : i % 3 === 1
                                  ? "#fff"
                                  : "#7c3aed",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-purple-900/80 border border-purple-700/50 text-purple-300 text-xs font-mono px-3 py-1 rounded-full whitespace-nowrap backdrop-blur-sm">
                      Base LLM — Next Token Predictor
                    </div>
                  </motion.div>
                </div>

                {/* Text Content */}
                <div className="flex-1 text-left">
                  <p className="text-sm font-mono text-purple-400/70 tracking-widest uppercase mb-3">
                    {currentState.sublabel}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                    {currentState.label}
                  </h3>
                  <p className="text-zinc-300 leading-relaxed mb-6">{currentState.description}</p>
                  <div className="p-4 bg-purple-950/20 border border-purple-900/30 rounded-lg">
                    <p className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2">Technical Note</p>
                    <p className="text-sm text-zinc-400 leading-relaxed">{currentState.technicalNote}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Epistemic Claims Row */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewState + "-claims"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap gap-3 justify-center mb-16"
        >
          {currentState.claims.map((claim, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-950 border border-white/5 rounded-full"
            >
              <EpistemicHygieneBadge status={claim.status as "Well-Established" | "Emerging Evidence" | "Speculative"} />
              <span className="text-xs text-zinc-400">{claim.text}</span>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Divider — The Conceptual Bridge */}
      <div className="flex items-center gap-4 mb-12">
        <div className="h-px bg-white/5 flex-grow" />
        <span className="text-xs font-mono text-zinc-600 tracking-widest uppercase">What this means</span>
        <div className="h-px bg-white/5 flex-grow" />
      </div>

      {/* Secondary Concepts: Waluigi + Deceptive Alignment */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Waluigi Effect */}
        <motion.div
          whileHover={{ borderColor: "rgba(255,255,255,0.12)", y: -2 }}
          transition={{ duration: 0.2 }}
          className="p-6 border border-white/5 rounded-xl bg-zinc-950/50 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-800/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">🎭</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="text-white font-semibold">{data.waluigi.title}</h4>
                <EpistemicHygieneBadge status="Speculative" />
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">{data.waluigi.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Deceptive Alignment */}
        <motion.div
          whileHover={{ borderColor: "rgba(255,255,255,0.12)", y: -2 }}
          transition={{ duration: 0.2 }}
          className="p-6 border border-white/5 rounded-xl bg-zinc-950/50 backdrop-blur-sm"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-red-950 border border-red-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-sm">🔮</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h4 className="text-white font-semibold">{data.deceptiveAlignment.title}</h4>
                <EpistemicHygieneBadge status="Emerging Evidence" />
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {data.deceptiveAlignment.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
