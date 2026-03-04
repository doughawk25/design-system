"use client"

import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function KbdShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <PreviewCard label="Single key">
        <Kbd>⌘</Kbd>
        <Kbd>Enter</Kbd>
      </PreviewCard>
      <PreviewCard label="Key combo (KbdGroup)">
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </PreviewCard>
    </div>
  )
}
