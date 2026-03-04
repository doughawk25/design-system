"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

import { Button } from "@/components/ui/button"
import { UiShowcaseContentHeader } from "@/components/ui-showcase/content-header"
import { UiShowcaseHeaderNav } from "@/components/ui-showcase/header-nav"
import { MarkMonoIcon } from "@/components/ui-showcase/mark-mono-icon"
import { UiShowcaseNav } from "@/components/ui-showcase/nav"
import { UI_SHOWCASE_ITEMS } from "@/lib/ui-showcase-config"

function getPageTitle(pathname: string): string {
  if (pathname === "/ui") return "seed"
  const item = UI_SHOWCASE_ITEMS.find((i) => i.path === pathname)
  if (item) return item.label
  const slug = pathname.replace("/ui/", "") || "ui"
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
}

export function UiShowcaseLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHome = pathname === "/ui"
  const title = getPageTitle(pathname)

  return (
    <>
      {!isHome && (
        <div
          className="border-border fixed left-4 top-[76px] z-[5] h-[calc(100vh-7rem)] w-56 overflow-hidden rounded-lg border shadow-sm"
          aria-label="UI showcase navigation"
        >
          <UiShowcaseNav />
        </div>
      )}
      <div
        className="fixed top-4 left-4 right-4 z-[6]"
      >
        <UiShowcaseHeaderNav />
      </div>
      <div
        className={`flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto pt-[64px] ${isHome ? "pl-4 pr-4" : "pl-[17rem] pr-4"}`}
      >
        <main className="min-w-0 flex-1 flex flex-col items-stretch overflow-visible text-left">
          <UiShowcaseContentHeader />
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center px-4 pt-[34px] pb-4"
          >
            {children}
          </motion.div>
          <footer className="border-border mt-auto flex w-full items-center justify-center border-t py-6 text-center text-sm text-muted-foreground">
            <p>Seed Design System · © 2026</p>
          </footer>
        </main>
      </div>
    </>
  )
}
