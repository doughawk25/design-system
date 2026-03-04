"use client"

import { Button } from "@/components/ui/button"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function ButtonShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <PreviewCard label="Variants">
        <Button>Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </PreviewCard>
      <PreviewCard label="Sizes">
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button size="icon">🔘</Button>
      </PreviewCard>
      <PreviewCard label="Disabled">
        <Button disabled>Disabled</Button>
      </PreviewCard>
    </div>
  )
}
