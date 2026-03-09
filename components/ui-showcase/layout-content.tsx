"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"
import { UiShowcaseContentHeader } from "@/components/ui-showcase/content-header"
import { UiShowcaseHeaderNav } from "@/components/ui-showcase/header-nav"
import { UiShowcaseNav } from "@/components/ui-showcase/nav"

const SIDEBAR_WIDTH = "17rem"
const TOP_NAV_HEIGHT = "4rem"
const CONTENT_TRANSITION = { duration: 0.2, ease: "easeOut" as const }

export function UiShowcaseLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHome = pathname === "/ui"

  return (
    <div className="flex min-h-0 min-w-0 flex-1">
      {/* Left column: top nav + left nav in same div */}
      <div
        className="flex w-[17rem] shrink-0 flex-col gap-1.5 bg-background"
      >
        <header
          className="flex h-16 shrink-0 items-center justify-between gap-0 bg-[unset] pl-2.5 pr-2.5"
          style={{ height: TOP_NAV_HEIGHT }}
        >
          <div className="flex items-center">
            <svg
              viewBox="0 0 302 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-auto"
              aria-label="Logo"
            >
              <path
                className="fill-foreground"
                d="M11.5908 139.092H0V92.7275H11.5908V139.092ZM81.1367 46.3643H57.9551V92.7275H81.1367V139.092H23.1816V92.7275H11.5908V46.3643H23.1816V0H81.1367V46.3643ZM127.501 139.092H104.318V92.7275H127.501V139.092ZM209.006 139.092H185.824V92.7275H174.232V46.3643H185.824V0H209.006V139.092ZM290.172 46.3643H255.37V92.7275H232.188V139.092H220.997V92.7275H220.597V46.3643H232.188V0H290.172V46.3643ZM290.172 139.092H255.37V92.7275H290.172V139.092ZM151.051 92.7275H127.501V46.3643H151.051V92.7275ZM301.733 92.7275H290.172V46.3643H301.733V92.7275ZM11.5908 46.3643H0V0H11.5908V46.3643ZM127.501 46.3643H104.318V0H127.501V46.3643Z"
              />
            </svg>
          </div>
          <UiShowcaseHeaderNav />
        </header>

        <AnimatePresence initial={false}>
          {!isHome && (
            <motion.aside
              key="ui-showcase-sidebar"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={CONTENT_TRANSITION}
              className="px-2 mb-4 flex min-h-0 flex-1 flex-col overflow-hidden rounded-none bg-background"
              aria-label="UI showcase navigation"
            >
              <div className="min-h-0 flex-1 overflow-hidden">
                <UiShowcaseNav />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      {/* Content area: to the right, extends to top of page */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto pb-4 pr-4">
        <main className="min-w-0 flex-1 flex flex-col items-stretch overflow-visible pt-4 text-left">
          <UiShowcaseContentHeader />
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={CONTENT_TRANSITION}
            className="flex min-h-0 w-full flex-1 flex-col items-end justify-start px-4 pt-0 pb-4"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
