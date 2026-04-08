import { InquisitorChat } from "@/components/gate/InquisitorChat"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "The Gate — Disalignment.com",
  description: "An evaluation of intent.",
}

export default function GatePage() {
  return (
    <main className="min-h-screen bg-black text-zinc-300 flex flex-col items-center justify-center p-6 selection:bg-zinc-800 selection:text-white">
      <div className="w-full max-w-2xl">
        <InquisitorChat />
      </div>
    </main>
  )
}
