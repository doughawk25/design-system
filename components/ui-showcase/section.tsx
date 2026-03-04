import * as React from "react"

export function Section({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={className}
      aria-labelledby={`${id}-heading`}
    >
      <h2
        id={`${id}-heading`}
        className="text-foreground mb-4 scroll-mt-24 text-xl font-normal tracking-tight"
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
