"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"

import { Icons } from "@/components/icons"
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
      {/* Logo top, Hamburger middle (fill + spacing auto), Mode bottom */}
      <div className="flex min-h-0 flex-1 flex-col items-center gap-2">
        <Link
          href="/ui"
          className="text-muted-foreground hover:text-foreground flex h-9 min-h-9 w-9 min-w-9 shrink-0 items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="seed design system"
        >
          <Icons.logo className="h-5 w-5 shrink-0" />
        </Link>
        <div className="flex min-h-[2.25rem] flex-1 items-center justify-center">
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
