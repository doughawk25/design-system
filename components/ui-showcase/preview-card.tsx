import * as React from "react"

export function PreviewCard({
  label,
  children,
  className,
}: {
  label?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={
        className
          ? `rounded-lg border border-border bg-card p-4 ${className}`
          : "rounded-lg border border-border bg-card p-4"
      }
    >
      {label && (
        <p className="text-muted-foreground mb-2 text-xs font-medium">{label}</p>
      )}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
