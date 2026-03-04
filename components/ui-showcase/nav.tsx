"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus } from "lucide-react"

import { UI_SHOWCASE_ITEMS } from "@/lib/ui-showcase-config"

export function UiShowcaseNav() {
  const pathname = usePathname()

  const foundations = UI_SHOWCASE_ITEMS.slice(0, 5)
  const components = UI_SHOWCASE_ITEMS.slice(5)

  const [foundationsOpen, setFoundationsOpen] = React.useState(true)
  const [componentsOpen, setComponentsOpen] = React.useState(true)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const handleScroll = () => {
      const scrolled = el.scrollTop > 0
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
    }

    handleScroll()
    el.addEventListener("scroll", handleScroll)

    return () => {
      el.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <nav
      aria-label="UI showcase"
      className="flex h-full min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-lg bg-background"
    >
      <div
        ref={scrollRef}
        className="no-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2 py-2"
      >
        <div className="flex flex-col gap-1 rounded-md border border-border/60 bg-card/40 py-0">
          <button
            type="button"
            onClick={() => setFoundationsOpen((open) => !open)}
            className="flex w-full items-center justify-between rounded-none px-2 py-2 text-sm font-medium text-muted-foreground [&[data-state=open]>svg]:rotate-45"
            aria-expanded={foundationsOpen}
            data-state={foundationsOpen ? "open" : "closed"}
          >
            <span className="font-semibold text-foreground">Foundations</span>
            <Plus className="text-muted-foreground pointer-events-none size-[14px] shrink-0 translate-y-0.5 transition-transform duration-200" />
          </button>
          <AnimatePresence initial={false}>
            {foundationsOpen && (
              <motion.div
                key="foundations-section"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="h-px w-full bg-border/60" />
                <div className="flex flex-col gap-1">
                  {foundations.map(({ path, label }) => {
                    const isActive = pathname === path
                    return (
                      <Link
                        key={path}
                        href={path}
                        className={`inline-flex items-center rounded-none px-2 py-2 text-sm transition-[color_1000ms_ease-in-out,transform_888ms_ease-in-out] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring will-change-transform hover:translate-x-1 ${
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col gap-1 rounded-md border border-border/60 bg-card/40 py-0">
          <button
            type="button"
            onClick={() => setComponentsOpen((open) => !open)}
            className="flex w-full items-center justify-between rounded-none px-2 py-2 text-sm font-medium text-muted-foreground [&[data-state=open]>svg]:rotate-45"
            aria-expanded={componentsOpen}
            data-state={componentsOpen ? "open" : "closed"}
          >
            <span className="font-semibold text-foreground">Components</span>
            <Plus className="text-muted-foreground pointer-events-none size-[14px] shrink-0 translate-y-0.5 transition-transform duration-200" />
          </button>
          <AnimatePresence initial={false}>
            {componentsOpen && (
              <motion.div
                key="components-section"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="h-px w-full bg-border/60" />
                <div className="flex flex-col gap-1">
                  {components.map(({ path, label }) => {
                    const isActive = pathname === path
                    return (
                      <Link
                        key={path}
                        href={path}
                        className={`inline-flex items-center rounded-none px-2 py-2 text-sm transition-[color_1000ms_ease-in-out,transform_888ms_ease-in-out] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring will-change-transform hover:translate-x-1 ${
                          isActive
                            ? "text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {label}
                      </Link>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between rounded-lg">
        <div
          className={`h-2 w-full shrink-0 bg-gradient-to-b from-background to-background/0 transition-opacity duration-200 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="h-2 w-full shrink-0 bg-gradient-to-t from-background to-background/0" />
      </div>
    </nav>
  )
}
