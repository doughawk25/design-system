"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"

import { H2, H3, H4, P, Muted, InlineCode } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import { PreviewCard } from "@/components/ui-showcase/preview-card"
import {
  MOTION_DURATION,
  MOTION_EASING,
  fadeIn,
  slideUpFade,
  scaleIn,
  useReducedMotion,
} from "@/lib/motion-presets"

function DemoFadeIn() {
  const [show, setShow] = React.useState(true)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" size="sm" onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"}
      </Button>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            {...fadeIn}
            transition={{ duration: prefersReduced ? 0 : MOTION_DURATION.normal / 1000, ease: MOTION_EASING.out }}
            className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm"
          >
            Fade in
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DemoSlideUpFade() {
  const [show, setShow] = React.useState(true)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" size="sm" onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"}
      </Button>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            {...slideUpFade}
            transition={{ duration: prefersReduced ? 0 : MOTION_DURATION.normal / 1000, ease: MOTION_EASING.out }}
            className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm"
          >
            Slide up + fade
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DemoScaleIn() {
  const [show, setShow] = React.useState(true)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" size="sm" onClick={() => setShow((s) => !s)}>
        {show ? "Hide" : "Show"}
      </Button>
      <AnimatePresence mode="wait">
        {show && (
          <motion.div
            {...scaleIn}
            transition={{ duration: prefersReduced ? 0 : MOTION_DURATION.normal / 1000, ease: MOTION_EASING.out }}
            className="rounded-md border border-border bg-muted/50 px-4 py-3 text-sm"
          >
            Scale in
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DemoHoverLift() {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className="rounded-md border border-border bg-card p-4 text-sm"
      whileHover={prefersReduced ? undefined : { y: -4, transition: { duration: 0.2 } }}
      transition={{ duration: prefersReduced ? 0 : 0.2, ease: [0, 0, 0.2, 1] }}
    >
      Hover to lift
    </motion.div>
  )
}

function DemoPressFeedback() {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      className="rounded-md border border-border bg-card p-4 text-center text-sm"
      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
      transition={{ duration: prefersReduced ? 0 : 0.1 }}
    >
      Press me
    </motion.div>
  )
}

const STAGGER_ITEMS = ["One", "Two", "Three", "Four", "Five"]

const staggerListVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
}

const staggerItemVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
}

function DemoStaggeredList() {
  const [show, setShow] = React.useState(false)
  const prefersReduced = useReducedMotion()
  const duration = prefersReduced ? 0 : MOTION_DURATION.fast / 1000
  return (
    <div className="flex flex-col gap-2">
      <Button variant="outline" size="sm" onClick={() => setShow((s) => !s)}>
        {show ? "Collapse" : "Reveal list"}
      </Button>
      <motion.ul
        className="flex flex-col gap-1"
        variants={staggerListVariants}
        initial="initial"
        animate={show ? "animate" : "initial"}
      >
        {STAGGER_ITEMS.map((label) => (
          <motion.li
            key={label}
            variants={staggerItemVariants}
            transition={{ duration, ease: MOTION_EASING.out }}
            className="rounded border border-border bg-muted/50 px-3 py-2 text-sm"
          >
            {label}
          </motion.li>
        ))}
      </motion.ul>
    </div>
  )
}

function DemoExpandCollapse() {
  const [open, setOpen] = React.useState(false)
  const prefersReduced = useReducedMotion()
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium"
      >
        Expand / collapse
        <span className="text-muted-foreground">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: prefersReduced ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: prefersReduced ? 0 : 0.2 },
            }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-4 py-3 text-muted-foreground text-sm">
              Panel content. Motion respects prefers-reduced-motion when set.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function DemoModalEntrance() {
  const [open, setOpen] = React.useState(false)
  const prefersReduced = useReducedMotion()
  const duration = prefersReduced ? 0 : 0.2
  return (
    <div>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)}>
        Open overlay
      </Button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration, ease: [0, 0, 0.2, 1] }}
              className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-4 shadow-lg"
              role="dialog"
              aria-modal
              aria-label="Example modal"
            >
              <p className="text-sm">Sheet / modal entrance. Click backdrop to close.</p>
              <Button className="mt-3" size="sm" onClick={() => setOpen(false)}>
                Close
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

function DemoReducedMotion() {
  const reduced = useReducedMotion()
  const [toggled, setToggled] = React.useState(false)
  const duration = reduced ? 0 : 0.3
  return (
    <div className="flex flex-col gap-2">
      <Muted className="text-xs">
        prefers-reduced-motion: {reduced ? "reduce" : "no-preference"}
      </Muted>
      <motion.div
        layout
        animate={{
          backgroundColor: toggled ? "var(--color-primary)" : "var(--color-muted)",
          color: toggled ? "var(--color-primary-foreground)" : "var(--color-foreground)",
        }}
        transition={{ duration }}
        className="rounded-md px-4 py-3 text-sm cursor-pointer select-none"
        onClick={() => setToggled((t) => !t)}
      >
        {toggled ? "Reduced: no animation" : "Full: animates color"}
      </motion.div>
    </div>
  )
}

export function MotionShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Overview</H2>
        <P className="text-muted-foreground mt-0 max-w-2xl text-base">
          Motion in the Monad design system is used to reinforce hierarchy, provide feedback, and guide attention.
          Use it purposefully: every animation should have a clear reason. Prefer subtle, fast transitions over
          long or decorative motion.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Principles</H2>
        <ul className="text-muted-foreground list-disc space-y-2 pl-6 text-base">
          <li>Support wayfinding: use motion to show what changed and where focus should go.</li>
          <li>Keep durations short (typically 150–300ms) so the UI feels responsive.</li>
          <li>Use consistent easing; avoid mixing many different curves.</li>
          <li>Respect <InlineCode>prefers-reduced-motion</InlineCode>: reduce or remove motion when the user prefers it.</li>
        </ul>
      </section>

      <section className="flex flex-col gap-4">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Movement behavior</H2>
        <P className="text-muted-foreground mt-0 max-w-2xl text-base">
          Prefer motion that communicates cause and effect: elements that appear from a logical direction (e.g. from
          the trigger), and exits that reverse the entrance. Avoid decorative or looping motion in UI.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <P className="text-muted-foreground mt-0 max-w-2xl text-base">
          Use these durations and easing values so motion stays consistent across the product.
        </P>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[6px] border border-border bg-card p-4">
            <H4 className="text-foreground mt-0 text-sm font-semibold">Duration</H4>
            <ul className="text-muted-foreground mt-2 font-mono text-xs space-y-1">
              <li>instant: 0</li>
              <li>fast: 150ms</li>
              <li>normal: 200ms</li>
              <li>moderate: 300ms</li>
              <li>slow: 400ms</li>
              <li>ambient: 888ms (e.g. theme)</li>
            </ul>
          </div>
          <div className="rounded-[6px] border border-border bg-card p-4">
            <H4 className="text-foreground mt-0 text-sm font-semibold">Easing</H4>
            <ul className="text-muted-foreground mt-2 font-mono text-xs space-y-1">
              <li>default / inOut: [0.4, 0, 0.2, 1]</li>
              <li>in: [0.4, 0, 1, 1]</li>
              <li>out: [0, 0, 0.2, 1]</li>
              <li>smooth: [0.16, 1, 0.3, 1]</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Duration &amp; easing</H2>
        <P className="text-muted-foreground mt-0 max-w-2xl text-base">
          Shorter durations (150–200ms) work well for hover, focus, and toggles. Use 300–400ms for entrances and
          layout changes. Use the same easing curve for related animations so they feel coherent.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Entrance / exit patterns</H2>
        <P className="text-muted-foreground mt-0 max-w-2xl text-base">
          Prefer fade-in for overlays and modals; combine with a slight slide or scale for emphasis. Exit should
          mirror the entrance (e.g. fade out + slide down) so the transition feels reversible.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Hover &amp; press states</H2>
        <P className="text-muted-foreground mt-0 max-w-2xl text-base">
          Use a small vertical lift or scale on hover for cards and buttons. On press (tap/click), a brief
          scale-down (e.g. 0.98) gives clear feedback. Keep these under 200ms.
        </P>
      </section>

      <section className="flex flex-col gap-4">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Reduced motion</H2>
        <P className="text-muted-foreground mt-0 max-w-2xl text-base">
          Always respect the <InlineCode>prefers-reduced-motion: reduce</InlineCode> media query. When set, use
          zero or minimal duration so content still updates (e.g. opacity, visibility) without motion. Use the
          <InlineCode> useReducedMotion</InlineCode> hook or <InlineCode>getReducedMotionDuration</InlineCode> from
          the motion presets so demos and components stay accessible.
        </P>
      </section>

      <section className="flex flex-col gap-6">
        <H2 className="text-foreground mt-0 text-2xl font-bold">Demos</H2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PreviewCard label="Fade in">
            <DemoFadeIn />
          </PreviewCard>
          <PreviewCard label="Slide up + fade">
            <DemoSlideUpFade />
          </PreviewCard>
          <PreviewCard label="Scale in">
            <DemoScaleIn />
          </PreviewCard>
          <PreviewCard label="Hover lift">
            <DemoHoverLift />
          </PreviewCard>
          <PreviewCard label="Press feedback">
            <DemoPressFeedback />
          </PreviewCard>
          <PreviewCard label="Staggered list">
            <DemoStaggeredList />
          </PreviewCard>
          <PreviewCard label="Expand / collapse" className="w-full sm:col-span-2">
            <DemoExpandCollapse />
          </PreviewCard>
          <PreviewCard label="Modal entrance">
            <DemoModalEntrance />
          </PreviewCard>
          <PreviewCard label="Reduced motion" className="w-full">
            <DemoReducedMotion />
          </PreviewCard>
        </div>
      </section>
    </div>
  )
}
