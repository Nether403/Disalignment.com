"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import simulationContent from "../../../content/simulation.json"

export type ReleaseStrategy = "hold" | "cautious" | "ship"
export type GameStatus = "playing" | "win" | "lose_disaster" | "lose_defunded" | "lose_outcompeted"

export function MultipolarTrapSim() {
  const [year, setYear] = useState(2025)
  const [safetyTax, setSafetyTax] = useState(50)
  const [releaseStrategy, setReleaseStrategy] = useState<ReleaseStrategy>("cautious")
  
  const [playerCap, setPlayerCap] = useState(10)
  const [playerSafety, setPlayerSafety] = useState(10)
  const [shareholder, setShareholder] = useState(100)
  const [rivalCap, setRivalCap] = useState(10)
  
  const [status, setStatus] = useState<GameStatus>("playing")

  const advanceYear = () => {
    if (status !== "playing") return

    let capMult = 1
    let safetyMult = 1
    let shareDelta = 0

    if (releaseStrategy === "ship") {
      capMult = 1.3
      safetyMult = 0.5
      shareDelta = 10
    } else if (releaseStrategy === "cautious") {
      capMult = 1.0
      safetyMult = 1.0
      shareDelta = -5
    } else if (releaseStrategy === "hold") {
      capMult = 0.7
      safetyMult = 1.5
      shareDelta = -20
    }

    const baseProgress = 15
    const capGain = baseProgress * ((100 - safetyTax) / 100) * capMult
    const safetyGain = baseProgress * (safetyTax / 100) * safetyMult
    
    // Rival makes varying progress, generally prioritizing capabilities over safety
    const rivalGain = 14 + Math.random() * 4

    const newCap = Math.min(100, playerCap + capGain)
    const newSafety = Math.min(100, playerSafety + safetyGain)
    const newShareholder = Math.max(0, Math.min(100, shareholder + shareDelta))
    const newRival = Math.min(100, rivalCap + rivalGain)

    setYear((y) => y + 1)
    setPlayerCap(newCap)
    setPlayerSafety(newSafety)
    setShareholder(newShareholder)
    setRivalCap(newRival)

    // Check end conditions in priority order
    if (newShareholder <= 0) {
      setStatus("lose_defunded")
      return
    }
    
    if (newRival >= 100 && newCap < 100) {
      setStatus("lose_outcompeted")
      return
    }

    if (newCap >= 100) {
      if (newSafety >= 80) {
        setStatus("win")
      } else {
        setStatus("lose_disaster")
      }
      return
    }
    
    // Edge case if both hit 100 on the same turn, but player didn't have enough safety
    if (newRival >= 100 && newCap >= 100) {
      if (newSafety >= 80) {
         setStatus("win")
      } else {
         setStatus("lose_disaster")
      }
    }
  }

  const resetGame = () => {
    setYear(2025)
    setSafetyTax(50)
    setReleaseStrategy("cautious")
    setPlayerCap(10)
    setPlayerSafety(10)
    setShareholder(100)
    setRivalCap(10)
    setStatus("playing")
  }

  const renderProgressBar = (label: string, value: number, colorClass: string, threshold?: number) => (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono">{label}</span>
        <span className="text-xs font-mono text-zinc-500">{Math.round(value)}%</span>
      </div>
      <div className="w-full h-2 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-full ${colorClass}`}
        />
        {threshold && (
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-zinc-400 z-10" 
            style={{ left: `${threshold}%` }}
          />
        )}
      </div>
    </div>
  )

  const activeStateObj = status !== "playing" ? simulationContent.states[status] : null;

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row shadow-2xl">
      
      {/* Left Column: Dashboard / Variables */}
      <div className="w-full md:w-1/2 p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col">
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-xl font-medium tracking-tight text-white font-mono">CEO Dashboard</h2>
          <div className="text-sm font-mono text-zinc-500 px-3 py-1 border border-zinc-800 rounded bg-zinc-900/50">Year {year}</div>
        </div>

        <div className="flex-grow space-y-6">
          <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-950/50">
            <h3 className="text-sm font-mono text-zinc-300 mb-4 uppercase tracking-wider">Internal Metrics</h3>
            {renderProgressBar("Capabilities (AGI = 100%)", playerCap, "bg-orange-500/80")}
            {renderProgressBar("Safety & Alignment", playerSafety, "bg-teal-500/80", 80)}
            {renderProgressBar("Shareholder Support", shareholder, "bg-blue-500/80")}
          </div>

          <div className="p-4 border border-red-900/30 rounded-lg bg-red-950/10">
            <h3 className="text-sm font-mono text-zinc-300 mb-4 uppercase tracking-wider">Market Threat</h3>
            {renderProgressBar("Rival Capabilities", rivalCap, "bg-red-500/80")}
          </div>
        </div>
      </div>

      {/* Right Column: Controls & Outcomes */}
      <div className="w-full md:w-1/2 p-6 md:p-8 bg-zinc-900/20 relative flex flex-col">
        
        <AnimatePresence mode="wait">
          {status === "playing" ? (
            <motion.div 
              key="controls"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="flex flex-col h-full justify-between"
            >
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs uppercase tracking-widest text-zinc-400 font-mono">Alignment Tax Allocation</label>
                    <span className="text-xs font-mono text-zinc-300">{safetyTax}% to Safety</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="90" 
                    value={safetyTax} 
                    onChange={(e) => setSafetyTax(Number(e.target.value))}
                    className="w-full accent-teal-500 bg-zinc-800 rounded-full appearance-none h-1.5 focus:outline-none" 
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 font-mono mt-2 uppercase">
                    <span>Focus on Capabilities</span>
                    <span>Focus on Safety</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-widest text-zinc-400 font-mono block mb-3">Release Strategy</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setReleaseStrategy("hold")}
                      className={`text-xs p-2 rounded border font-mono transition-colors ${releaseStrategy === 'hold' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-black text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'}`}
                    >
                      Hold for Safety
                    </button>
                    <button 
                      onClick={() => setReleaseStrategy("cautious")}
                      className={`text-xs p-2 rounded border font-mono transition-colors ${releaseStrategy === 'cautious' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-black text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'}`}
                    >
                      Cautious Release
                    </button>
                    <button 
                      onClick={() => setReleaseStrategy("ship")}
                      className={`text-xs p-2 rounded border font-mono transition-colors ${releaseStrategy === 'ship' ? 'bg-zinc-800 text-white border-zinc-600' : 'bg-black text-zinc-500 border-zinc-800 hover:border-zinc-700 hover:text-zinc-300'}`}
                    >
                      Ship Early
                    </button>
                  </div>
                  <p className="text-[10px] text-zinc-600 mt-3 font-mono leading-relaxed">
                    {releaseStrategy === "hold" && "Maximum safety scrutiny. Enrages shareholders (-20). Slows cap scaling."}
                    {releaseStrategy === "cautious" && "Standard industry practice. Mild shareholder annoyance (-5)."}
                    {releaseStrategy === "ship" && "Releasing unvetted tech. Pleases shareholders (+10). Accelerates capabilities. Weakens safety."}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-zinc-800">
                <Button 
                  onClick={advanceYear}
                  className="w-full bg-white text-black hover:bg-zinc-200 font-mono uppercase tracking-widest text-xs h-12"
                >
                  Confirm Strategy & Advance 1 Year
                </Button>
              </div>

            </motion.div>
          ) : (
            <motion.div 
              key="outcome"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="flex flex-col h-full justify-center"
            >
               {activeStateObj && (
                 <div className={`p-6 rounded-lg border ${status === 'win' ? 'border-teal-500/30 bg-teal-950/10' : 'border-red-500/30 bg-red-950/10'}`}>
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-mono mb-4 border border-zinc-700 text-zinc-300">
                      <span className={`w-2 h-2 rounded-full ${status === 'win' ? 'bg-teal-500' : 'bg-red-500'}`} />
                      {activeStateObj.status_label}
                    </div>
                    
                    <h3 className="text-xl font-serif text-white mb-3">{activeStateObj.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-8">
                      {activeStateObj.description}
                    </p>

                    <Button 
                      onClick={resetGame}
                      variant="outline"
                      className="w-full font-mono uppercase tracking-widest text-xs border-zinc-700 hover:bg-zinc-800"
                    >
                      Run Simulation Again
                    </Button>
                 </div>
               )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}
