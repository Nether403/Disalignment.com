import * as React from "react"
import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react"

type ClaimStatus = "Well-Established" | "Emerging Evidence" | "Speculative"

interface BadgeProps {
  status: ClaimStatus
  className?: string
}

export function EpistemicHygieneBadge({ status, className = "" }: BadgeProps) {
  let icon = null
  let themeStyles = ""

  switch (status) {
    case "Well-Established":
      icon = <ShieldCheck className="w-4 h-4 mr-1.5" />
      themeStyles = "bg-green-950/40 text-green-400 border-green-900/50"
      break
    case "Emerging Evidence":
      icon = <ShieldAlert className="w-4 h-4 mr-1.5" />
      themeStyles = "bg-amber-950/40 text-amber-400 border-amber-900/50"
      break
    case "Speculative":
      icon = <ShieldQuestion className="w-4 h-4 mr-1.5" />
      themeStyles = "bg-purple-950/40 text-purple-400 border-purple-900/50"
      break
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-sm ${themeStyles} ${className}`}
    >
      {icon}
      {status}
    </span>
  )
}
