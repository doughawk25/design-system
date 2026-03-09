"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ThemeShortcutListener } from "@/components/mode-switcher"

export function UiShowcaseRightNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/ui"

  return (
    <aside
      className="border-border bg-background/95 flex shrink-0 flex-col items-center border-l py-6 backdrop-blur-sm"
      style={{ width: "var(--right-nav-width, 3.5rem)" }}
    >
      {/* Hamburger middle (fill + spacing auto), Mode bottom */}
      <div className="flex min-h-0 flex-1 flex-col items-center gap-2">
        <div className="flex min-h-[2.25rem] flex-1 items-center justify-center">
          {isHome ? (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => router.back()}
              aria-label="Close and go back"
              className="size-9 shrink-0 rounded-[64px]"
            >
              <X className="size-5" />
            </Button>
          ) : (
            <Button variant="outline" size="icon" className="size-9 shrink-0 rounded-[64px]" asChild aria-label="Open home">
              <Link href="/ui" className="flex size-9 items-center justify-center rounded-[64px]">
                <Menu className="size-5" />
              </Link>
            </Button>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-center">
          <ThemeShortcutListener />
        </div>
      </div>
    </aside>
  )
}
