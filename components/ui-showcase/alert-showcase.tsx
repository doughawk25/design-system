"use client"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function AlertShowcase() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <PreviewCard label="Default" className="w-full">
        <Alert className="w-full max-w-md">
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description text for the alert.</AlertDescription>
        </Alert>
      </PreviewCard>
      <PreviewCard label="Destructive" className="w-full">
        <Alert variant="destructive" className="w-full max-w-md">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Something went wrong.</AlertDescription>
        </Alert>
      </PreviewCard>
    </div>
  )
}
