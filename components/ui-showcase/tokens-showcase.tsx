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

/** Swatch for Tailwind ramp shades using static bg-* classes so all colors are present. */
function RampSwatch({
  name,
  shade,
  bgClass,
}: {
  name: string
  shade: (typeof SHADES)[number]
  bgClass: string
}) {
  const copyValue = bgClass
  const swatchRef = React.useRef<HTMLDivElement>(null)
  const [values, setValues] = React.useState<{ oklch: string; hex: string } | null>(null)

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
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [name, shade])

  return (
    <TokenCopyable copyValue={copyValue} className="rounded-md p-1 outline outline-1 outline-border">
      <div className="flex flex-col gap-1">
        <div
          ref={swatchRef}
          className={`h-14 w-full rounded-sm border border-border ${bgClass}`}
        />
        <div className="text-muted-foreground flex flex-col gap-0.5 px-0.5 text-xs">
          <span className="font-medium text-foreground">{name}-{shade}</span>
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

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

/** Static Tailwind bg-* classes per ramp so all colors are in the bundle. */
const RAMP_BG_CLASSES: Record<string, Record<(typeof SHADES)[number], string>> = {
  zinc: { 50: "bg-zinc-50", 100: "bg-zinc-100", 200: "bg-zinc-200", 300: "bg-zinc-300", 400: "bg-zinc-400", 500: "bg-zinc-500", 600: "bg-zinc-600", 700: "bg-zinc-700", 800: "bg-zinc-800", 900: "bg-zinc-900", 950: "bg-zinc-950" },
  slate: { 50: "bg-slate-50", 100: "bg-slate-100", 200: "bg-slate-200", 300: "bg-slate-300", 400: "bg-slate-400", 500: "bg-slate-500", 600: "bg-slate-600", 700: "bg-slate-700", 800: "bg-slate-800", 900: "bg-slate-900", 950: "bg-slate-950" },
  gray: { 50: "bg-gray-50", 100: "bg-gray-100", 200: "bg-gray-200", 300: "bg-gray-300", 400: "bg-gray-400", 500: "bg-gray-500", 600: "bg-gray-600", 700: "bg-gray-700", 800: "bg-gray-800", 900: "bg-gray-900", 950: "bg-gray-950" },
  neutral: { 50: "bg-neutral-50", 100: "bg-neutral-100", 200: "bg-neutral-200", 300: "bg-neutral-300", 400: "bg-neutral-400", 500: "bg-neutral-500", 600: "bg-neutral-600", 700: "bg-neutral-700", 800: "bg-neutral-800", 900: "bg-neutral-900", 950: "bg-neutral-950" },
  stone: { 50: "bg-stone-50", 100: "bg-stone-100", 200: "bg-stone-200", 300: "bg-stone-300", 400: "bg-stone-400", 500: "bg-stone-500", 600: "bg-stone-600", 700: "bg-stone-700", 800: "bg-stone-800", 900: "bg-stone-900", 950: "bg-stone-950" },
  red: { 50: "bg-red-50", 100: "bg-red-100", 200: "bg-red-200", 300: "bg-red-300", 400: "bg-red-400", 500: "bg-red-500", 600: "bg-red-600", 700: "bg-red-700", 800: "bg-red-800", 900: "bg-red-900", 950: "bg-red-950" },
  orange: { 50: "bg-orange-50", 100: "bg-orange-100", 200: "bg-orange-200", 300: "bg-orange-300", 400: "bg-orange-400", 500: "bg-orange-500", 600: "bg-orange-600", 700: "bg-orange-700", 800: "bg-orange-800", 900: "bg-orange-900", 950: "bg-orange-950" },
  amber: { 50: "bg-amber-50", 100: "bg-amber-100", 200: "bg-amber-200", 300: "bg-amber-300", 400: "bg-amber-400", 500: "bg-amber-500", 600: "bg-amber-600", 700: "bg-amber-700", 800: "bg-amber-800", 900: "bg-amber-900", 950: "bg-amber-950" },
  yellow: { 50: "bg-yellow-50", 100: "bg-yellow-100", 200: "bg-yellow-200", 300: "bg-yellow-300", 400: "bg-yellow-400", 500: "bg-yellow-500", 600: "bg-yellow-600", 700: "bg-yellow-700", 800: "bg-yellow-800", 900: "bg-yellow-900", 950: "bg-yellow-950" },
  lime: { 50: "bg-lime-50", 100: "bg-lime-100", 200: "bg-lime-200", 300: "bg-lime-300", 400: "bg-lime-400", 500: "bg-lime-500", 600: "bg-lime-600", 700: "bg-lime-700", 800: "bg-lime-800", 900: "bg-lime-900", 950: "bg-lime-950" },
  green: { 50: "bg-green-50", 100: "bg-green-100", 200: "bg-green-200", 300: "bg-green-300", 400: "bg-green-400", 500: "bg-green-500", 600: "bg-green-600", 700: "bg-green-700", 800: "bg-green-800", 900: "bg-green-900", 950: "bg-green-950" },
  emerald: { 50: "bg-emerald-50", 100: "bg-emerald-100", 200: "bg-emerald-200", 300: "bg-emerald-300", 400: "bg-emerald-400", 500: "bg-emerald-500", 600: "bg-emerald-600", 700: "bg-emerald-700", 800: "bg-emerald-800", 900: "bg-emerald-900", 950: "bg-emerald-950" },
  teal: { 50: "bg-teal-50", 100: "bg-teal-100", 200: "bg-teal-200", 300: "bg-teal-300", 400: "bg-teal-400", 500: "bg-teal-500", 600: "bg-teal-600", 700: "bg-teal-700", 800: "bg-teal-800", 900: "bg-teal-900", 950: "bg-teal-950" },
  cyan: { 50: "bg-cyan-50", 100: "bg-cyan-100", 200: "bg-cyan-200", 300: "bg-cyan-300", 400: "bg-cyan-400", 500: "bg-cyan-500", 600: "bg-cyan-600", 700: "bg-cyan-700", 800: "bg-cyan-800", 900: "bg-cyan-900", 950: "bg-cyan-950" },
  sky: { 50: "bg-sky-50", 100: "bg-sky-100", 200: "bg-sky-200", 300: "bg-sky-300", 400: "bg-sky-400", 500: "bg-sky-500", 600: "bg-sky-600", 700: "bg-sky-700", 800: "bg-sky-800", 900: "bg-sky-900", 950: "bg-sky-950" },
  blue: { 50: "bg-blue-50", 100: "bg-blue-100", 200: "bg-blue-200", 300: "bg-blue-300", 400: "bg-blue-400", 500: "bg-blue-500", 600: "bg-blue-600", 700: "bg-blue-700", 800: "bg-blue-800", 900: "bg-blue-900", 950: "bg-blue-950" },
  indigo: { 50: "bg-indigo-50", 100: "bg-indigo-100", 200: "bg-indigo-200", 300: "bg-indigo-300", 400: "bg-indigo-400", 500: "bg-indigo-500", 600: "bg-indigo-600", 700: "bg-indigo-700", 800: "bg-indigo-800", 900: "bg-indigo-900", 950: "bg-indigo-950" },
  violet: { 50: "bg-violet-50", 100: "bg-violet-100", 200: "bg-violet-200", 300: "bg-violet-300", 400: "bg-violet-400", 500: "bg-violet-500", 600: "bg-violet-600", 700: "bg-violet-700", 800: "bg-violet-800", 900: "bg-violet-900", 950: "bg-violet-950" },
  purple: { 50: "bg-purple-50", 100: "bg-purple-100", 200: "bg-purple-200", 300: "bg-purple-300", 400: "bg-purple-400", 500: "bg-purple-500", 600: "bg-purple-600", 700: "bg-purple-700", 800: "bg-purple-800", 900: "bg-purple-900", 950: "bg-purple-950" },
  fuchsia: { 50: "bg-fuchsia-50", 100: "bg-fuchsia-100", 200: "bg-fuchsia-200", 300: "bg-fuchsia-300", 400: "bg-fuchsia-400", 500: "bg-fuchsia-500", 600: "bg-fuchsia-600", 700: "bg-fuchsia-700", 800: "bg-fuchsia-800", 900: "bg-fuchsia-900", 950: "bg-fuchsia-950" },
  pink: { 50: "bg-pink-50", 100: "bg-pink-100", 200: "bg-pink-200", 300: "bg-pink-300", 400: "bg-pink-400", 500: "bg-pink-500", 600: "bg-pink-600", 700: "bg-pink-700", 800: "bg-pink-800", 900: "bg-pink-900", 950: "bg-pink-950" },
  rose: { 50: "bg-rose-50", 100: "bg-rose-100", 200: "bg-rose-200", 300: "bg-rose-300", 400: "bg-rose-400", 500: "bg-rose-500", 600: "bg-rose-600", 700: "bg-rose-700", 800: "bg-rose-800", 900: "bg-rose-900", 950: "bg-rose-950" },
}

/** Tailwind default color ramps (exposed in color foundations). */
const TAILWIND_COLOR_RAMPS = [
  { name: "zinc", label: "Zinc" },
  { name: "slate", label: "Slate" },
  { name: "gray", label: "Gray" },
  { name: "neutral", label: "Neutral" },
  { name: "stone", label: "Stone" },
  { name: "red", label: "Red" },
  { name: "orange", label: "Orange" },
  { name: "amber", label: "Amber" },
  { name: "yellow", label: "Yellow" },
  { name: "lime", label: "Lime" },
  { name: "green", label: "Green" },
  { name: "emerald", label: "Emerald" },
  { name: "teal", label: "Teal" },
  { name: "cyan", label: "Cyan" },
  { name: "sky", label: "Sky" },
  { name: "blue", label: "Blue" },
  { name: "indigo", label: "Indigo" },
  { name: "violet", label: "Violet" },
  { name: "purple", label: "Purple" },
  { name: "fuchsia", label: "Fuchsia" },
  { name: "pink", label: "Pink" },
  { name: "rose", label: "Rose" },
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
            Color ramps (Tailwind defaults)
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl text-xs">
            Default palette ramps available as utilities (e.g. bg-zinc-100, text-blue-600) and as
            CSS variables (e.g. var(--color-zinc-500)). Shades 50–950.
          </p>
          <div className="flex flex-col gap-8">
            {TAILWIND_COLOR_RAMPS.map((ramp) => (
              <div key={ramp.name}>
                <h4 className="text-muted-foreground mb-2 text-xs font-medium uppercase tracking-wide">
                  {ramp.label}
                </h4>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-11">
                  {SHADES.map((shade) => (
                    <RampSwatch
                      key={`${ramp.name}-${shade}`}
                      name={ramp.name}
                      shade={shade}
                      bgClass={RAMP_BG_CLASSES[ramp.name]?.[shade] ?? ""}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Divider className="my-6" />
          <h3 className="text-foreground mb-3 text-sm font-normal">
            Semantic tokens (Tailwind-backed)
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl text-xs">
            These tokens map to Tailwind default colors (zinc, red, blue) for background, primary, borders, etc.
          </p>
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
