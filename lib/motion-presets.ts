/**
 * Motion presets for the Monad design system.
 * Use with Framer Motion (motion/react). Respects prefers-reduced-motion.
 */

import * as React from "react"

/** Recommended durations (ms). */
export const MOTION_DURATION = {
  instant: 0,
  fast: 150,
  normal: 200,
  moderate: 300,
  slow: 400,
  /** Theme / ambient transitions (e.g. theme switch). */
  ambient: 888,
} as const

/** Recommended easing curves. */
export const MOTION_EASING = {
  default: [0.4, 0, 0.2, 1] as const,
  in: [0.4, 0, 1, 1] as const,
  out: [0, 0, 0.2, 1] as const,
  inOut: [0.4, 0, 0.2, 1] as const,
  /** Softer deceleration. */
  smooth: [0.16, 1, 0.3, 1] as const,
} as const

/** Fade in. */
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: MOTION_DURATION.normal / 1000, ease: MOTION_EASING.out },
}

/** Slide up + fade. */
export const slideUpFade = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: MOTION_DURATION.normal / 1000, ease: MOTION_EASING.out },
}

/** Scale in (subtle). */
export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
  transition: { duration: MOTION_DURATION.normal / 1000, ease: MOTION_EASING.out },
}

/** Stagger container for list reveals. */
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
}

/** Stagger child (use with staggerContainer). */
export const staggerChild = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: MOTION_DURATION.fast / 1000, ease: MOTION_EASING.out },
}

/**
 * Transition config that respects prefers-reduced-motion.
 * When reduced motion is preferred, duration is 0 and no spring bounce.
 */
export function reduceMotionAwareTransition(
  defaultTransition: { duration?: number; ease?: readonly number[]; type?: "spring"; stiffness?: number; damping?: number }
): typeof defaultTransition {
  if (typeof window === "undefined") return defaultTransition
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReduced) {
    return { duration: 0, ease: [0, 0, 0.2, 1] }
  }
  return defaultTransition
}

/**
 * Duration in seconds for motion, or 0 when prefers-reduced-motion.
 */
export function getReducedMotionDuration(ms: number): number {
  if (typeof window === "undefined") return ms / 1000
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  return prefersReduced ? 0 : ms / 1000
}

/** Hook: true when the user prefers reduced motion. */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReduced(mq.matches)
    const handler = () => setPrefersReduced(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
  return prefersReduced
}
