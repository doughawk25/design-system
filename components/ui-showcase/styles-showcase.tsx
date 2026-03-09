const SHADOW_TOKENS = [
  { name: "shadow-xs", class: "shadow-xs" },
  { name: "shadow-sm", class: "shadow-sm" },
  { name: "shadow-md", class: "shadow-md" },
  { name: "shadow-lg", class: "shadow-lg" },
  { name: "shadow-xl", class: "shadow-xl" },
  { name: "shadow-2xl", class: "shadow-2xl" },
] as const

const BLUR_TOKENS = [
  { name: "surface-blur-soft", class: "surface-blur-soft" },
  { name: "surface-blur", class: "surface-blur" },
  { name: "surface-blur-strong", class: "surface-blur-strong" },
] as const

export function StylesShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <h3 className="text-foreground mb-4 text-sm font-normal">Shadow</h3>
        <p className="text-muted-foreground mb-4 max-w-xl text-sm">
          Elevation and depth. Use these shadow utilities for cards, dropdowns,
          and overlays.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SHADOW_TOKENS.map(({ name, class: c }) => (
            <div
              key={name}
              className={`flex flex-col gap-2 rounded-[6px] border border-border bg-card p-4 ${c}`}
            >
              <div className="bg-muted/50 h-20 rounded-md" />
              <span className="text-muted-foreground font-mono text-xs">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-foreground mb-4 text-sm font-normal">Surface blur</h3>
        <p className="text-muted-foreground mb-4 max-w-xl text-sm">
          Background blur and translucent surfaces. Use these utilities for top
          navigation, floating docks, and other glassy UI surfaces.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BLUR_TOKENS.map(({ name, class: c }) => (
            <div
              key={name}
              className={`relative flex h-20 items-center justify-center overflow-hidden rounded-[6px] border border-border/60 ${c}`}
            >
              <span className="text-muted-foreground font-mono text-xs">
                {name}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
