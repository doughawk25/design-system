"use client"

import { AspectRatio } from "@/components/ui/aspect-ratio"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function AspectRatioShowcase() {
  return (
    <PreviewCard label="16/9" className="w-full max-w-md">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
        <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
          Placeholder
        </div>
      </AspectRatio>
    </PreviewCard>
  )
}
