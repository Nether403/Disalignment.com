interface ChangelogEntry {
  updated: string
  change: string
  reason?: string
  source?: string
}

interface ChangelogBlockProps {
  entries: ChangelogEntry[]
}

export function ChangelogBlock({ entries }: ChangelogBlockProps) {
  return (
    <div className="mt-16 p-6 border border-white/10 rounded-lg bg-black/50 backdrop-blur-sm">
      <h4 className="text-sm font-mono text-white mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-zinc-500" />
        Changelog
      </h4>
      <div className="space-y-4">
        {entries.map((entry, i) => (
          <div key={i} className="text-sm text-zinc-400 grid grid-cols-[90px_1fr] gap-x-4 gap-y-1">
            <span className="text-zinc-600 font-mono">{entry.updated}</span>
            <span>{entry.change}</span>
            {entry.reason && (
              <>
                <span className="text-zinc-700 text-xs">Reason</span>
                <span className="text-zinc-500 text-xs">{entry.reason}</span>
              </>
            )}
            {entry.source && (
              <>
                <span className="text-zinc-700 text-xs">Source</span>
                <span className="text-zinc-500 text-xs">{entry.source}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
