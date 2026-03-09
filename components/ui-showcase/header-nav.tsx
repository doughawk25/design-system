"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion } from "motion/react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeSwitcher, ThemeShortcutListener } from "@/components/mode-switcher"

const ROTATE_EASING = "cubic-bezier(0.4, 0, 0.2, 1)"
const ROTATE_DURATION_MS = 220
const NAV_TRANSITION = { type: "spring", stiffness: 300, damping: 30 }

export function UiShowcaseHeaderNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/ui"

  // X at 0° = close; X rotated -45° = plus (open home)
  const iconStyle = {
    transform: isHome ? "rotate(0deg)" : "rotate(-45deg)",
    transition: `transform ${ROTATE_DURATION_MS}ms ${ROTATE_EASING}`,
  }

  return (
    <motion.header
      layout
      transition={NAV_TRANSITION}
      className="border-border/60 bg-card/40 relative z-10 flex w-fit items-center gap-2 rounded-[64px] border pl-2.5 pr-0.5 py-0.5"
      style={{ width: "fit-content" }}
      aria-label="Main navigation"
    >
      <ModeSwitcher />
      <motion.div layout transition={NAV_TRANSITION} className="flex shrink-0 items-center justify-center">
        {isHome ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => router.back()}
            aria-label="Close and go back"
            className="size-9 shrink-0 rounded-[64px]"
          >
            <X className="size-5 shrink-0" style={iconStyle} aria-hidden />
          </Button>
        ) : (
          <Button variant="outline" size="icon" className="size-9 shrink-0 rounded-[64px]" asChild aria-label="Open home">
            <Link href="/ui" className="flex size-9 items-center justify-center rounded-[64px]">
              <X className="size-5 shrink-0" style={iconStyle} aria-hidden />
            </Link>
          </Button>
        )}
      </motion.div>
    </motion.header>
  )
}
