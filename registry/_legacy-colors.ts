/**
 * Legacy colors format for lib/colors and docs colors page.
 */
export const colors: Record<
  string,
  Array<{
    scale: number
    rgb: string
    hsl: string
    hex: string
    oklch: string
  }>
> = {
  neutral: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map(
    (scale, i) => {
      const l = Math.round(100 - (i + 1) * 9)
      return {
        scale,
        rgb: `rgb(${l},${l},${l})`,
        hsl: `hsl(0,0%,${l}%)`,
        hex: `#${l.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}${l.toString(16).padStart(2, "0")}`,
        oklch: `oklch(${(l / 100).toFixed(2)}, 0, 0)`,
      }
    }
  ),
}
