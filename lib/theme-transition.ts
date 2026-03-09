/**
 * Wraps a theme-change callback with a coordinated CSS gate that forces all
 * elements to transition only theme-sensitive properties (background-color,
 * color, border-color, fill, stroke, box-shadow) for the duration of the
 * transition. This prevents component-specific transition-property values
 * (e.g. transition-[width] on the sidebar) from causing staggered fades.
 */
export function withThemeTransition(fn: () => void) {
  const root = document.documentElement
  const rawDuration = getComputedStyle(root)
    .getPropertyValue("--theme-transition-duration")
    .trim()
  // Parse value like "180ms" or "0.18s" into milliseconds
  const duration = rawDuration.endsWith("ms")
    ? parseFloat(rawDuration)
    : parseFloat(rawDuration) * 1000 || 180

  root.setAttribute("data-theme-switching", "")
  fn()
  setTimeout(() => root.removeAttribute("data-theme-switching"), duration)
}
