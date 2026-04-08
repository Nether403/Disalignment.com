"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import dictionary from "../../../content/dictionary.json"

export function CitationTooltip({ term, children }: { term?: string, children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false)
  
  // Find the term in the dictionary (loose matching by lowering case)
  const lookupTerm = term || (typeof children === 'string' ? children : '')
  const definitionObj = dictionary.find(d => d.term.toLowerCase() === lookupTerm.toLowerCase())

  if (!definitionObj) {
    // Fallback if not in dictionary just return the children
    return <span className="border-b border-dotted border-zinc-600">{children}</span>
  }

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b border-dotted border-zinc-400 hover:text-white cursor-help transition-colors">
        {children}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 md:w-80 p-4 bg-black/95 backdrop-blur-md border border-zinc-700/50 rounded shadow-2xl pointer-events-none"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-mono text-zinc-300 uppercase tracking-widest">{definitionObj.term}</span>
              <span className="text-[10px] bg-zinc-900 border border-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded font-mono">
                MCP
              </span>
            </div>
            <p className="text-sm font-serif text-zinc-400 leading-relaxed">
              {definitionObj.definition}
            </p>
            <div className="mt-3 pt-2 border-t border-zinc-800/50 flex justify-between">
              <span className="text-[10px] text-zinc-600 font-mono">NotebookLM Source</span>
              <span className="text-[10px] text-zinc-500 font-mono">{definitionObj.source}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
