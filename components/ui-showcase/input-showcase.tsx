"use client"

import { Input } from "@/components/ui/input"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function InputShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <PreviewCard label="Default">
        <Input placeholder="Placeholder" className="w-64" />
      </PreviewCard>
      <PreviewCard label="Disabled">
        <Input disabled placeholder="Disabled" className="w-64" />
      </PreviewCard>
      <PreviewCard label="Error (aria-invalid)">
        <Input
          aria-invalid
          defaultValue="Invalid value"
          className="w-64"
        />
      </PreviewCard>
    </div>
  )
}
