"use client"

import { usePathname } from "next/navigation"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"

export function UiShowcaseContentHeader() {
  const pathname = usePathname()

  // Currently no per-page header content; reserved for future use.
  return null
}
