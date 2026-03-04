"use client"

import * as React from "react"

export function ChartBarMixed(props: React.ComponentProps<"div">) {
  return (
    <div
      className="flex h-[200px] w-full items-center justify-center rounded border bg-muted text-muted-foreground text-sm"
      {...props}
    >
      Chart (chart-bar-mixed)
    </div>
  )
}
