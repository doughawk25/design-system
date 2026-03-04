import { BASES } from "@/registry/bases"
import { STYLES } from "@/registry/styles"

export type Style = { name: string }

const LEGACY_STYLE_NAMES = [
  "new-york-v4",
  ...BASES.flatMap((base) =>
    STYLES.map((style) => `${base.name}-${style.name}`)
  ),
]

export const legacyStyles: Style[] = LEGACY_STYLE_NAMES.map((name) => ({
  name,
}))

export function getStyle(name: string): Style | undefined {
  return legacyStyles.find((s) => s.name === name)
}

export async function getActiveStyle(): Promise<Style> {
  return legacyStyles[0] ?? { name: "new-york-v4" }
}
