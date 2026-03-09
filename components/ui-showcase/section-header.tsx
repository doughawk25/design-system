/**
 * Section header: page number (left), title (center), description (right) in one row with auto spacing.
 */
export function UiShowcaseSectionHeader({
  title,
  description,
  pageNumber,
}: {
  title: string
  description?: string | null
  pageNumber?: string | null
}) {
  return (
    <div className="flex items-start gap-6 border-b border-border pb-12 pt-12">
      <div className="flex min-w-0 flex-1 justify-start">
        <span className="text-muted-foreground font-mono text-2xl font-medium tabular-nums" aria-hidden>
          {pageNumber ?? ""}
        </span>
      </div>
      <h1 className="scroll-m-20 shrink-0 px-4 text-center text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h1>
      <div className="flex min-w-0 flex-1 justify-end">
        {description ? (
          <p className="text-muted-foreground max-w-[333px] text-left text-sm">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
