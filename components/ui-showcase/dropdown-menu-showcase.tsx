"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function DropdownMenuShowcase() {
  return (
    <PreviewCard label="Trigger to open">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Open menu</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem>Item one</DropdownMenuItem>
          <DropdownMenuItem>Item two</DropdownMenuItem>
          <DropdownMenuItem>Item three</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </PreviewCard>
  )
}
