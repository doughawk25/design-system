"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MarkMonoIcon } from "@/components/ui-showcase/mark-mono-icon"
import { ModeSwitcher, ThemeShortcutListener } from "@/components/mode-switcher"

export function UiShowcaseHeaderNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/ui"

  return (
    <header
      className="border-border surface-blur-strong relative z-10 flex items-center justify-between gap-4 rounded-lg border px-0.5 py-0.5 shadow-sm"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2">
        {isHome ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            aria-label="Close and go back"
            className="size-9 shrink-0"
          >
            <X className="size-5" />
          </Button>
        ) : (
          <Button variant="outline" size="icon" className="size-9 shrink-0" asChild aria-label="Open home">
            <Link href="/ui" className="flex size-9 items-center justify-center">
              <MarkMonoIcon className="size-5 w-5 shrink-0" />
            </Link>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <ModeSwitcher />
        <ThemeShortcutListener />
      </div>
    </header>
  )
}
