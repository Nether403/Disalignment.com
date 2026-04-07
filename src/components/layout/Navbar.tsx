import Link from "next/link"

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full border-b border-white/5 bg-black/50 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <Link href="/" className="text-white font-mono tracking-widest text-sm uppercase">
            Disalignment
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
          <Link href="#start-here" className="hover:text-white transition-colors">Primer</Link>
          <Link href="#case-files" className="hover:text-white transition-colors">Case Files</Link>
          <Link href="#anatomy" className="hover:text-white transition-colors">Anatomy of LLMs</Link>
          <Link href="#debate" className="hover:text-white transition-colors">Debate Index</Link>
          <Link href="#practice" className="hover:text-white transition-colors">Simulation Room</Link>
          <Link href="/gate" className="text-zinc-500 hover:text-white transition-colors px-3 py-1.5 border border-zinc-800 rounded-md">
            The Gate
          </Link>
        </div>
      </div>
    </nav>
  )
}
