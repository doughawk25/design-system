"use client"

import * as React from "react"
import { createPortal } from "react-dom"

import { Divider } from "@/components/ui/divider"
import { computedColorToOklchHex } from "@/lib/token-color-utils"

const MOUSE_FOLLOW_OFFSET = { x: 12, y: 12 }

function TokenCopyable({
  copyValue,
  children,
  className,
}: {
  copyValue: string
  children: React.ReactNode
  className?: string
}) {
  const [position, setPosition] = React.useState<{ x: number; y: number } | null>(null)
  const [isHovering, setIsHovering] = React.useState(false)
  const [copied, setCopied] = React.useState(false)

  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true)
    setCopied(false)
  }, [])

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    setPosition({ x: e.clientX + MOUSE_FOLLOW_OFFSET.x, y: e.clientY + MOUSE_FOLLOW_OFFSET.y })
  }, [])

  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false)
    setPosition(null)
    setCopied(false)
  }, [])

  const doCopy = React.useCallback(() => {
    window.navigator.clipboard.writeText(copyValue)
    setCopied(true)
  }, [copyValue])

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      doCopy()
    },
    [doCopy]
  )

  return (
    <>
      <div
        className={className}
        role="button"
        tabIndex={0}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            doCopy()
          }
        }}
        style={{ cursor: "pointer" }}
      >
        {children}
      </div>
      {(isHovering || copied) &&
        position &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[9999] rounded-md border border-border bg-popover px-2.5 py-1.5 text-popover-foreground text-xs font-medium shadow-md"
            style={{
              left: position.x,
              top: position.y,
            }}
          >
            {copied ? "Token copied" : "Copy token"}
          </div>,
          document.body
        )}
    </>
  )
}

function ColorSwatchCard({
  name,
  class: c,
  border,
}: {
  name: string
  class: string
  border?: boolean
}) {
  const swatchRef = React.useRef<HTMLDivElement>(null)
  const [values, setValues] = React.useState<{
    oklch: string
    hex: string
  } | null>(null)

  React.useLayoutEffect(() => {
    const el = swatchRef.current
    if (!el) return
    const read = () => {
      const computed = getComputedStyle(el).backgroundColor
      const result = computedColorToOklchHex(computed)
      if (result) setValues(result)
    }
    read()
    const t1 = setTimeout(read, 0)
    const t2 = setTimeout(read, 100)
    const t3 = setTimeout(read, 300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [c])

  return (
    <TokenCopyable copyValue={c} className="rounded-md p-1 outline outline-1 outline-border">
      <div className="flex flex-col gap-1">
        <div
          ref={swatchRef}
          className={`h-14 w-full rounded-sm ${c} ${
            border ? "border border-border" : ""
          }`}
        />
        <div className="text-muted-foreground flex flex-col gap-0.5 px-0.5 text-xs">
          <span className="font-medium text-foreground">{name}</span>
          {values && (
            <>
              <span className="font-mono text-[10px]">{values.oklch}</span>
              <span className="font-mono text-[10px]">{values.hex}</span>
            </>
          )}
        </div>
      </div>
    </TokenCopyable>
  )
}

const BRAND_COLOR_TOKENS = [
  // Brand
  { name: "brand-surface", class: "bg-brand-surface", border: true },
  { name: "brand-foreground", class: "bg-brand-foreground" },
  {
    name: "brand-foreground-muted",
    class: "bg-brand-foreground-muted",
    border: true,
  },
  // Aqua
  { name: "aqua-surface", class: "bg-aqua-surface", border: true },
  { name: "aqua-foreground", class: "bg-aqua-foreground" },
  {
    name: "aqua-foreground-muted",
    class: "bg-aqua-foreground-muted",
    border: true,
  },
] as const

const COLOR_TOKEN_GROUPS = [
  {
    title: "Base",
    tokens: [
      { name: "background", class: "bg-background", border: true },
      { name: "foreground", class: "bg-foreground" },
      { name: "card", class: "bg-card", border: true },
      { name: "card-foreground", class: "bg-card-foreground" },
      { name: "popover", class: "bg-popover", border: true },
      { name: "popover-foreground", class: "bg-popover-foreground" },
    ] as const,
  },
  {
    title: "Semantic",
    tokens: [
      { name: "primary", class: "bg-primary" },
      { name: "primary-foreground", class: "bg-primary-foreground" },
      { name: "secondary", class: "bg-secondary", border: true },
      { name: "secondary-foreground", class: "bg-secondary-foreground" },
      { name: "muted", class: "bg-muted", border: true },
      { name: "muted-foreground", class: "bg-muted-foreground" },
      { name: "accent", class: "bg-accent", border: true },
      { name: "accent-foreground", class: "bg-accent-foreground" },
      { name: "destructive", class: "bg-destructive" },
      { name: "destructive-foreground", class: "bg-destructive-foreground" },
    ] as const,
  },
  {
    title: "Borders, inputs & ring",
    tokens: [
      { name: "border", class: "bg-border" },
      { name: "input", class: "bg-input", border: true },
      { name: "ring", class: "bg-ring" },
    ] as const,
  },
  {
    title: "Surface & code",
    tokens: [
      { name: "surface", class: "bg-surface", border: true },
      { name: "surface-foreground", class: "bg-surface-foreground" },
      { name: "code", class: "bg-code", border: true },
      { name: "code-foreground", class: "bg-code-foreground" },
      { name: "code-highlight", class: "bg-code-highlight", border: true },
      { name: "code-number", class: "bg-code-number" },
    ] as const,
  },
  {
    title: "Selection",
    tokens: [
      { name: "selection", class: "bg-selection" },
      { name: "selection-foreground", class: "bg-selection-foreground" },
    ] as const,
  },
  {
    title: "Charts",
    tokens: [
      { name: "chart-1", class: "bg-chart-1" },
      { name: "chart-2", class: "bg-chart-2" },
      { name: "chart-3", class: "bg-chart-3" },
      { name: "chart-4", class: "bg-chart-4" },
      { name: "chart-5", class: "bg-chart-5" },
    ] as const,
  },
  {
    title: "Sidebar",
    tokens: [
      { name: "sidebar", class: "bg-sidebar", border: true },
      { name: "sidebar-foreground", class: "bg-sidebar-foreground" },
      { name: "sidebar-primary", class: "bg-sidebar-primary" },
      {
        name: "sidebar-primary-foreground",
        class: "bg-sidebar-primary-foreground",
      },
      { name: "sidebar-accent", class: "bg-sidebar-accent", border: true },
      {
        name: "sidebar-accent-foreground",
        class: "bg-sidebar-accent-foreground",
      },
      { name: "sidebar-border", class: "bg-sidebar-border" },
      { name: "sidebar-ring", class: "bg-sidebar-ring" },
    ] as const,
  },
] as const

const RADII = [
  { name: "radius-sm", class: "rounded-sm" },
  { name: "radius-md", class: "rounded-md" },
  { name: "radius-lg", class: "rounded-lg" },
  { name: "radius-xl", class: "rounded-xl" },
  { name: "radius-2xl", class: "rounded-2xl" },
] as const

const SPACING = [
  { name: "spacing-1", factor: 1 },
  { name: "spacing-2", factor: 2 },
  { name: "spacing-3", factor: 3 },
  { name: "spacing-4", factor: 4 },
  { name: "spacing-6", factor: 6 },
  { name: "spacing-8", factor: 8 },
] as const

export function ColorTokensShowcase() {
  return (
    <section id="color">
      <div className="flex flex-col gap-8">
        <div className="mx-2">
          <h3 className="text-foreground mb-3 text-sm font-normal">
            Brand
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {BRAND_COLOR_TOKENS.map(({ name, class: c, border }) => (
              <ColorSwatchCard
                key={name}
                name={name}
                class={c}
                border={border}
              />
            ))}
          </div>
          <Divider className="my-6" />
          <h3 className="text-foreground mb-3 text-sm font-normal">Colors</h3>
          <div className="flex flex-col gap-6">
            {COLOR_TOKEN_GROUPS.map((group) => (
              <div key={group.title}>
                <h4 className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                  {group.title}
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {group.tokens.map(({ name, class: c, border }) => (
                    <ColorSwatchCard
                      key={name}
                      name={name}
                      class={c}
                      border={border}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function SpaceTokensShowcase() {
  return (
    <section id="space">
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-foreground mb-3 text-sm font-normal">Radii</h3>
          <div className="flex flex-wrap gap-4">
            {RADII.map(({ name, class: c }) => (
            <TokenCopyable key={name} copyValue={c} className="flex flex-col items-center gap-1">
                <div className={`h-12 w-12 bg-muted border border-border ${c}`} />
                <span className="text-muted-foreground text-xs px-0.5">
                  {name}
                </span>
              </TokenCopyable>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-foreground mb-3 text-sm font-normal">Spacing</h3>
          <div className="flex flex-wrap gap-4">
            {SPACING.map(({ name, factor }) => (
              <TokenCopyable
                key={name}
                copyValue={`--spacing(${factor})`}
                className="flex flex-col items-start gap-1"
              >
                <div
                  className="w-16 rounded-sm bg-muted border border-border"
                  style={{ height: `calc(var(--spacing) * ${factor})` }}
                />
                <span className="text-muted-foreground text-xs px-0.5">
                  {name}
                </span>
              </TokenCopyable>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function TokensShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <ColorTokensShowcase />
      <SpaceTokensShowcase />
    </div>
  )
}
