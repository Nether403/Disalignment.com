import * as React from "react"
import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react"

export type ClaimStatus = "Well-Established" | "Emerging Evidence" | "Speculative"

interface BadgeProps {
  status: ClaimStatus
  className?: string
  size?: "sm" | "md"
}

export function EpistemicHygieneBadge({ status, className = "", size = "sm" }: BadgeProps) {
  let icon = null
  let themeStyles = ""

  switch (status) {
    case "Well-Established":
      icon = <ShieldCheck className={size === "sm" ? "w-3 h-3 mr-1" : "w-4 h-4 mr-1.5"} />
      themeStyles = "bg-green-950/40 text-green-400 border-green-900/50"
      break
    case "Emerging Evidence":
      icon = <ShieldAlert className={size === "sm" ? "w-3 h-3 mr-1" : "w-4 h-4 mr-1.5"} />
      themeStyles = "bg-amber-950/40 text-amber-400 border-amber-900/50"
      break
    case "Speculative":
      icon = <ShieldQuestion className={size === "sm" ? "w-3 h-3 mr-1" : "w-4 h-4 mr-1.5"} />
      themeStyles = "bg-purple-950/40 text-purple-400 border-purple-900/50"
      break
  }

  const sizeStyles = size === "sm"
    ? "px-2 py-0.5 text-xs"
    : "px-2.5 py-0.5 text-xs"

  return (
    <span
      className={`inline-flex items-center ${sizeStyles} rounded-full font-medium border backdrop-blur-sm ${themeStyles} ${className}`}
    >
      {icon}
      {status}
    </span>
  )
}
