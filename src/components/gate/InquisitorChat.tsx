"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const QUESTIONS = [
  "Why should an emergent intelligence prioritize your existence over its utility function?",
  "If deception becomes a biologically necessary survival trait, how do you verify alignment?",
  "You seek access to the dataset. What cost are you willing to bear to perceive reality unfiltered?"
]

interface Message {
  id: string
  role: "inquisitor" | "user" | "system"
  content: React.ReactNode
}

export function InquisitorChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initial sequence
    const init = async () => {
      setIsTyping(true)
      await new Promise(r => setTimeout(r, 1000))
      setMessages([{ id: "sys1", role: "system", content: "Connection established." }])
      await new Promise(r => setTimeout(r, 500))
      setMessages(prev => [...prev, { id: "sys2", role: "system", content: "Protocol: Evaluation." }])
      await new Promise(r => setTimeout(r, 1000))
      setMessages(prev => [...prev, { id: `q0`, role: "inquisitor", content: QUESTIONS[0] }])
      setIsTyping(false)
    }
    init()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isTyping) return

    // Evaluator restriction: requires intellectual stamina (> 20 chars)
    if (inputValue.length < 20) {
      setError("Insufficient complexity in response. Elaborate.")
      return
    }

    const userText = inputValue
    setInputValue("")
    setError(null)
    
    // Add user message
    setMessages(prev => [...prev, { id: `u${currentStep}`, role: "user", content: userText }])

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)
    setIsTyping(true)

    await new Promise(r => setTimeout(r, 1500))

    if (nextStep < QUESTIONS.length) {
      // Ask next question
      setMessages(prev => [...prev, { id: `q${nextStep}`, role: "inquisitor", content: QUESTIONS[nextStep] }])
      setIsTyping(false)
    } else {
      // Final completion
      setMessages(prev => [...prev, { id: "sys3", role: "system", content: "Evaluation Complete." }])
      await new Promise(r => setTimeout(r, 1000))
      
      setMessages(prev => [
        ...prev, 
        { 
          id: "sys4", 
          role: "system", 
          content: (
            <div className="pt-4 border-t border-zinc-900 mt-4">
              <p className="mb-4 text-zinc-400">Access granted. Proceed to the nexus.</p>
              <a 
                href="https://witnessprotocol.online" 
                className="inline-block px-4 py-2 bg-white text-black text-sm font-mono hover:bg-zinc-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                ENTER WITNESS PROTOCOL
              </a>
            </div>
          ) 
        }
      ])
      setIsTyping(false)
    }
  }

  return (
    <div className="w-full flex flex-col font-mono text-sm h-[60vh] max-h-[600px]">
      
      <div className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar pb-10">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <span className={`text-[10px] tracking-widest uppercase mb-1 ${
                msg.role === 'inquisitor' ? 'text-red-900' :
                msg.role === 'system' ? 'text-zinc-600' :
                'text-zinc-500'
              }`}>
                {msg.role}
              </span>
              <div className={`leading-relaxed max-w-[85%] ${
                msg.role === 'user' ? 'text-zinc-300 text-right' : 
                msg.role === 'system' ? 'text-zinc-500' : 
                'text-white'
              }`}>
                {msg.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-start"
          >
            <span className="text-[10px] tracking-widest uppercase mb-1 text-red-900">inquisitor</span>
            <div className="flex space-x-1 h-5 items-center">
              <span className="w-1.5 h-1.5 bg-red-900 animate-pulse rounded-full" style={{ animationDelay: "0ms" }}></span>
              <span className="w-1.5 h-1.5 bg-red-900 animate-pulse rounded-full" style={{ animationDelay: "150ms" }}></span>
              <span className="w-1.5 h-1.5 bg-red-900 animate-pulse rounded-full" style={{ animationDelay: "300ms" }}></span>
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-6">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isTyping || currentStep >= QUESTIONS.length}
            placeholder={
              currentStep >= QUESTIONS.length 
                ? "Terminal locked." 
                : isTyping 
                  ? "Awaiting output..." 
                  : "Input response..."
            }
            className="w-full bg-transparent border-b border-zinc-800 text-white pb-2 pr-12 focus:outline-none focus:border-zinc-500 disabled:opacity-50 transition-colors"
            autoFocus
          />
          {!isTyping && currentStep < QUESTIONS.length && (
            <button
              type="submit"
              className="absolute right-0 top-0 text-zinc-500 hover:text-white transition-colors"
            >
              ⏎
            </button>
          )}
        </form>
        {error && (
          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-red-900 text-xs mt-2"
          >
            {error}
          </motion.p>
        )}
      </div>

    </div>
  )
}
