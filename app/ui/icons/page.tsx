 "use client"

import * as React from "react"
import * as GeistIcons from "@geist-ui/icons"

import { Input } from "@/components/ui/input"

export default function IconsPage() {
  const [query, setQuery] = React.useState("")

  const entries = React.useMemo(
    () =>
      Object.entries(GeistIcons).filter(
        ([, value]) => typeof value === "function"
      ) as [string, React.ComponentType<React.SVGProps<SVGSVGElement>>][],
    []
  )

  const filteredEntries = React.useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return entries

    return entries.filter(([name]) => name.toLowerCase().includes(value))
  }, [entries, query])

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Icon
      </h1>
      <p className="text-muted-foreground text-sm">
        Geist icon set from Vercel, exposed as React components.
      </p>
      <div className="flex flex-col gap-2">
        <label className="text-muted-foreground text-xs font-medium">
          Search icons
        </label>
        <Input
          placeholder="Search by icon name..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="max-w-xs"
        />
        <span className="text-muted-foreground text-xs">
          Showing {filteredEntries.length} of {entries.length} icons
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {filteredEntries.map(([name, Icon]) => (
          <div
            key={name}
            className="border-border hover:bg-muted/60 flex flex-col items-center gap-2 rounded-md border p-3 text-center transition-colors"
          >
            <Icon className="text-foreground size-6" />
            <span className="text-muted-foreground break-words text-[11px] font-mono leading-tight">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

