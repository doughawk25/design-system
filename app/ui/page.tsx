"use client"

import { useState } from "react"
import Link from "next/link"
import { Component, LayoutGrid, Palette, Paintbrush, Sparkles, Type } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react"

import { Card, CardContent } from "@/components/ui/card"

const cards = [
  { href: "/ui/color", label: "Color", icon: Palette },
  { href: "/ui/icons", label: "Icons", icon: LayoutGrid },
  { href: "/ui/typography", label: "Type", icon: Type },
  { href: "/ui/styles", label: "Effects", icon: Paintbrush },
  { href: "/ui/button", label: "Components", icon: Component },
  { href: null, label: "Shader", icon: Sparkles },
] as { href: string | null; label: string; icon: typeof Palette }[]

const TILT_MAX = 1.2
const TILT_SPRING = { stiffness: 300, damping: 20 }

/** Card 3D tilt intensity. 0 = off, 100 = default (1.2°), e.g. 50 = subtler, 200 = stronger. */
const TILT_INTENSITY_PERCENT = 100

function TiltCard({
  href,
  label,
  icon: Icon,
  index,
  isDimmed,
  onHoverChange,
}: {
  href: string | null
  label: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  index: number
  isDimmed: boolean
  onHoverChange?: (index: number | null) => void
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, TILT_SPRING)
  const springY = useSpring(y, TILT_SPRING)
  const transform = useMotionTemplate`perspective(800px) rotateX(${springY}deg) rotateY(${springX}deg)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const normX = (e.clientX - centerX) / (rect.width / 2)
    const normY = (e.clientY - centerY) / (rect.height / 2)
    const scale = TILT_INTENSITY_PERCENT / 100
    x.set(normX * TILT_MAX * scale)
    y.set(-normY * TILT_MAX * scale)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    onHoverChange?.(null)
  }

  const handleMouseEnter = () => {
    onHoverChange?.(index)
  }

  const isLocked = href === null

  const cardContent = (
    <Card
      className="surface-blur-strong relative flex h-full w-full flex-col p-6"
    >
      <CardContent className="flex flex-1 flex-col p-0">
        <span className="text-card-foreground text-lg font-semibold">{label}</span>
        <span className="text-card-foreground/90 absolute bottom-6 right-6 flex size-16 items-center justify-center overflow-hidden">
          <svg width={0} height={0} aria-hidden>
            <defs>
              {/* 1px inner shadow on top of the vector */}
              <filter id={`inner-shadow-top-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                <feOffset in="SourceAlpha" dx="0" dy="-1" result="offset" />
                <feGaussianBlur in="offset" stdDeviation="0.5" result="blur" />
                <feFlood floodColor="black" floodOpacity="0.35" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadowMask" />
                <feComposite in2="SourceAlpha" in="shadowMask" operator="in" result="innerShadow" />
                <feComposite in2="SourceGraphic" in="innerShadow" operator="over" result="final" />
              </filter>
            </defs>
          </svg>
          {/* Muted foreground stroke with 1px top inner shadow */}
          <Icon
            className="size-16 shrink-0 text-card-foreground/90"
            strokeWidth={1.5}
            stroke="currentColor"
            fill="none"
            style={{ filter: `url(#inner-shadow-top-${index})` }}
          />
        </span>
      </CardContent>
    </Card>
  )

  return (
    <motion.div
      className="flex min-h-0 w-full flex-1"
      style={{ perspective: 800 }}
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: isDimmed ? 0.66 : 1, x: 0 }}
      transition={{
        opacity: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
        x: { duration: 0.4, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] },
      }}
    >
      <motion.div
        style={{ transform }}
        className="h-full w-full"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isLocked ? (
          <div
            className="block h-full w-full cursor-not-allowed rounded-[6px] opacity-90 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] hover:opacity-100"
            aria-disabled
          >
            {cardContent}
          </div>
        ) : (
          <Link
            href={href}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 block h-full w-full rounded-[6px] opacity-90 transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.02] hover:opacity-100"
          >
            {cardContent}
          </Link>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function UiShowcasePage() {
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null)
  return (
    <div className="flex h-full min-h-0 w-full flex-1 flex-col items-end justify-start p-4">
      <div className="grid h-full w-full max-w-4xl grid-cols-2 grid-rows-3 content-stretch items-stretch gap-2 sm:grid-cols-3 sm:grid-rows-2 sm:gap-2">
        {cards.map(({ href, label, icon: Icon }, i) => (
          <TiltCard
            key={label}
            href={href}
            label={label}
            icon={Icon}
            index={i}
            isDimmed={hoveredCardIndex !== null && hoveredCardIndex !== i}
            onHoverChange={setHoveredCardIndex}
          />
        ))}
      </div>
    </div>
  )
}
