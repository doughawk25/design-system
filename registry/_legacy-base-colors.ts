import { THEMES } from "@/registry/themes"

export type BaseColor = (typeof THEMES)[number]

export const baseColors: BaseColor[] = [...THEMES]

export const baseColorsOKLCH = baseColors
