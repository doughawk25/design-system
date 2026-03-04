"use client"

import * as React from "react"
import * as LucideIcons from "lucide-react"

export function IconLucide({ name, ...props }: { name: string } & React.SVGAttributes<SVGElement>) {
  const Icon = (LucideIcons as Record<string, React.ComponentType<React.SVGAttributes<SVGElement>>>)[name]
  if (!Icon) return <span className="size-5 bg-muted rounded" />
  return <Icon {...props} />
}
