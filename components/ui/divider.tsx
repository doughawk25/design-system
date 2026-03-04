"use client"

import * as React from "react"

import { Separator } from "@/components/ui/separator"

type DividerProps = React.ComponentProps<typeof Separator>

export function Divider({ className, ...props }: DividerProps) {
  return (
    <Separator
      orientation="horizontal"
      className={["bg-border w-full h-px", className].filter(Boolean).join(" ")}
      {...props}
    />
  )
}

