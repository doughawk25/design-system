"use client"

import Link from "next/link"
import { Search } from "lucide-react"
import { usePathname } from "next/navigation"
import * as React from "react"

import { UI_SHOWCASE_ITEMS, FOUNDATIONS_LENGTH } from "@/lib/ui-showcase-config"
import { Input } from "@/components/ui/input"

const NAV_SCROLL_KEY = "ui-showcase-nav-scroll"

/** Light haptic when hovering/focusing nav links. Uses Vibration API where supported (e.g. Android). */
function triggerNavHaptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(10)
  }
}

export function UiShowcaseNav() {
  const pathname = usePathname()
  const [search, setSearch] = React.useState("")

  const foundations = UI_SHOWCASE_ITEMS.slice(0, FOUNDATIONS_LENGTH)
  const components = UI_SHOWCASE_ITEMS.slice(FOUNDATIONS_LENGTH)

  const query = search.trim().toLowerCase()
  const filterItems = (items: typeof foundations) =>
    query
      ? items.filter(
          (item) =>
            item.label.toLowerCase().includes(query) ||
            item.path.toLowerCase().includes(query) ||
            item.description.toLowerCase().includes(query)
        )
      : items

  const filteredFoundations = filterItems(foundations)
  const filteredComponents = filterItems(components)
  const hasResults = filteredFoundations.length > 0 || filteredComponents.length > 0

  const [isScrolled, setIsScrolled] = React.useState(false)
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const pathnameRef = React.useRef<string | null>(null)

  // Restore scroll position from before refresh
  React.useLayoutEffect(() => {
    const el = scrollRef.current
    const saved = typeof sessionStorage !== "undefined" ? sessionStorage.getItem(NAV_SCROLL_KEY) : null
    if (el && saved) {
      const top = Number(saved)
      if (!Number.isNaN(top)) {
        el.scrollTop = top
        setIsScrolled(top > 0)
      }
    }
  }, [])

  // Persist scroll position when user scrolls
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf = 0
    const save = () => {
      raf = 0
      try {
        sessionStorage.setItem(NAV_SCROLL_KEY, String(el.scrollTop))
      } catch {}
    }
    const handleScroll = () => {
      const scrolled = el.scrollTop > 0
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))
      if (!raf) raf = requestAnimationFrame(save)
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      el.removeEventListener("scroll", handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll the active link into view only when pathname changes (e.g. after navigation), not on initial load/refresh
  React.useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const isInitial = pathnameRef.current === null
    pathnameRef.current = pathname
    if (isInitial) return
    const active = el.querySelector('[data-active="true"]')
    if (active && typeof active.scrollIntoView === "function") {
      active.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [pathname])

  return (
    <nav
      aria-label="UI showcase"
      className="flex h-full min-h-0 w-full shrink-0 flex-col overflow-hidden rounded-lg bg-background"
    >
      <div className="box-content shrink-0 px-0 pb-2">
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2" aria-hidden />
          <Input
            type="search"
            placeholder="Search nav..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full bg-muted/50 pl-8 pr-2 text-sm shadow-none placeholder:text-muted-foreground"
            aria-label="Search navigation"
          />
        </div>
      </div>
      <div
        ref={scrollRef}
        className="no-scrollbar flex min-h-0 w-full flex-1 flex-col gap-0.5 overflow-y-auto scroll-smooth px-0 py-0.5"
        style={{ width: "100%" }}
      >
        {hasResults ? (
          <>
        {filteredFoundations.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-border/60 bg-card/40 py-0">
          <div className="flex w-full items-center rounded-none px-2 py-2 text-sm font-medium text-muted-foreground">
            <span className="font-semibold text-foreground">Foundations</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            {filteredFoundations.map(({ path, label }, index) => {
              const isActive = pathname === path
              const pageNumber = String(index + 1).padStart(2, "0")
              const originalIndex = foundations.findIndex((f) => f.path === path)
              const displayNumber = originalIndex >= 0 ? String(originalIndex + 1).padStart(2, "0") : pageNumber
              return (
                <Link
                  key={path}
                  href={path}
                  data-active={isActive ? "true" : undefined}
                  onMouseEnter={triggerNavHaptic}
                  onFocus={triggerNavHaptic}
                  className={`group flex w-full items-center justify-between rounded-none px-2 py-[8px] text-sm transition-[color_888ms_ease-in-out] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="transition-transform duration-200 ease-in-out group-hover:translate-x-1">{label}</span>
                  <span className="tabular-nums shrink-0 text-muted-foreground group-hover:text-foreground group-data-[active=true]:text-foreground">
                    {displayNumber}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
        )}
        {filteredComponents.length > 0 && (
        <div className="flex flex-col gap-1 rounded-md border border-border/60 bg-card/40 py-0">
          <div className="flex w-full items-center rounded-none px-2 py-2 text-sm font-medium text-muted-foreground">
            <span className="font-semibold text-foreground">Components</span>
          </div>
          <div className="flex flex-col gap-[8px]">
            {filteredComponents.map(({ path, label }, index) => {
              const isActive = pathname === path
              const pageNumber = String(index + 1).padStart(2, "0")
              const originalIndex = components.findIndex((c) => c.path === path)
              const displayNumber = originalIndex >= 0 ? String(originalIndex + FOUNDATIONS_LENGTH + 1).padStart(2, "0") : pageNumber
              return (
                <Link
                  key={path}
                  href={path}
                  data-active={isActive ? "true" : undefined}
                  onMouseEnter={triggerNavHaptic}
                  onFocus={triggerNavHaptic}
                  className={`group flex w-full items-center justify-between rounded-none px-2 py-[8px] text-sm transition-[color_888ms_ease-in-out] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="transition-transform duration-200 ease-in-out group-hover:translate-x-1">{label}</span>
                  <span className="tabular-nums shrink-0 text-muted-foreground group-hover:text-foreground group-data-[active=true]:text-foreground">
                    {displayNumber}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
        )}
          </>
        ) : (
          <p className="px-2 py-4 text-center text-sm text-muted-foreground">
            No results for &quot;{search.trim()}&quot;
          </p>
        )}
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
