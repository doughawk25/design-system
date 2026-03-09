/**
 * Parse computed RGB/RGBA string to [r,g,b] in 0-1.
 * getComputedStyle returns "rgb(r, g, b)" or "rgba(r, g, b, a)" or "rgb(r g b)".
 */
function parseRgbString(str: string): [number, number, number] | null {
  const s = str.trim()
  // rgb(r, g, b) or rgba(r, g, b, a)
  let match = s.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*[\d.]+)?\s*\)/
  )
  if (match) {
    return [
      Number(match[1]) / 255,
      Number(match[2]) / 255,
      Number(match[3]) / 255,
    ]
  }
  // rgb(r g b) space-separated
  match = s.match(/rgba?\(\s*(\d+)\s+(\d+)\s+(\d+)(?:\s*\/\s*[\d.]+)?\s*\)/)
  if (match) {
    return [
      Number(match[1]) / 255,
      Number(match[2]) / 255,
      Number(match[3]) / 255,
    ]
  }
  return null
}

/**
 * Parse color(srgb r g b) or color(srgb r g b / a) - CSS Color Level 4.
 * Components are 0-1 or 0-100 with %. Returns [r,g,b] in 0-1 or null.
 */
function parseColorSrgbString(str: string): [number, number, number] | null {
  const s = str.trim().toLowerCase()
  // color(srgb r g b) or color(srgb r g b / a), with optional % on each component
  const match = s.match(
    /color\s*\(\s*srgb\s+([\d.]+)\s*%?\s+([\d.]+)\s*%?\s+([\d.]+)\s*%?(?:\s*\/\s*[\d.]+)?\s*\)/
  )
  if (!match) return null
  let r = Number(match[1])
  let g = Number(match[2])
  let b = Number(match[3])
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return null
  // If values are in 0-100 range (e.g. from some serializations), normalize to 0-1
  if (r > 1 || g > 1 || b > 1) {
    r = r / 100
    g = g / 100
    b = b / 100
  }
  return [r, g, b]
}

/**
 * Parse oklch(L C H) or oklch(L% C H) with optional / alpha.
 * Returns { L: 0-1, C, H in degrees } or null.
 */
function parseOklchString(str: string): { L: number; C: number; H: number } | null {
  const s = str.trim().toLowerCase()
  // oklch(L% C H) or oklch(L C H) with optional / alpha (number or %)
  const match = s.match(
    /oklch\(\s*([\d.]+)\s*%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+%?)?\s*\)/
  )
  if (!match) return null
  let L = Number(match[1])
  if (L > 1) L = L / 100
  const C = Number(match[2])
  const H = Number(match[3])
  if (Number.isNaN(L) || Number.isNaN(C) || Number.isNaN(H)) return null
  return { L, C, H }
}

/**
 * Parse hsl(h s% l%) or hsla(h s% l% / a). Returns [r,g,b] in 0-1 or null.
 */
function parseHslString(str: string): [number, number, number] | null {
  const s = str.trim().toLowerCase()
  const match = s.match(
    /hsla?\(\s*([\d.]+)\s+([\d.]+)\s*%\s+([\d.]+)\s*%(?:\s*\/\s*[\d.]+)?\s*\)/
  )
  if (!match) return null
  const h = Number(match[1]) / 360
  const sat = Number(match[2]) / 100
  const l = Number(match[3]) / 100
  if (Number.isNaN(h) || Number.isNaN(sat) || Number.isNaN(l)) return null
  // HSL to RGB conversion
  let r: number, g: number, b: number
  if (sat === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1
      if (t > 1) t -= 1
      if (t < 1 / 6) return p + (q - p) * 6 * t
      if (t < 1 / 2) return q
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
      return p
    }
    const q = l < 0.5 ? l * (1 + sat) : l + sat - l * sat
    const p = 2 * l - q
    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }
  return [r, g, b]
}

/** sRGB (0-1) to linear sRGB */
function linearizeSrgb(c: number): number {
  const abs = Math.abs(c)
  const sign = c < 0 ? -1 : 1
  if (abs <= 0.04045) return c / 12.92
  return sign * ((abs + 0.055) / 1.055) ** 2.4
}

/** Linear sRGB to XYZ (D65) - W3C matrix */
function linSrgbToXyz(
  rgb: [number, number, number]
): [number, number, number] {
  const [r, g, b] = rgb.map(linearizeSrgb)
  const M = [
    [506752 / 1228815, 87881 / 245763, 12673 / 70218],
    [87098 / 409605, 175762 / 245763, 12673 / 175545],
    [7918 / 409605, 87881 / 737289, 1001167 / 1053270],
  ]
  const x = M[0][0] * r + M[0][1] * g + M[0][2] * b
  const y = M[1][0] * r + M[1][1] * g + M[1][2] * b
  const z = M[2][0] * r + M[2][1] * g + M[2][2] * b
  return [x, y, z]
}

/** Linear sRGB (0-1) to sRGB */
function delinearizeSrgb(c: number): number {
  const abs = Math.abs(c)
  const sign = c < 0 ? -1 : 1
  if (abs <= 0.0031308) return c * 12.92
  return sign * (1.055 * abs ** (1 / 2.4) - 0.055)
}

/** XYZ (D65) to linear sRGB - inverse of linSrgbToXyz */
function xyzToLinSrgb(xyz: [number, number, number]): [number, number, number] {
  const M = [
    [12887969 / 3969000, -87881 / 245763, -12673 / 702180],
    [-87098 / 409605, 175762 / 245763, 12673 / 1755450],
    [7918 / 409605, -87881 / 737289, 1001167 / 10532700],
  ]
  const r = M[0][0] * xyz[0] + M[0][1] * xyz[1] + M[0][2] * xyz[2]
  const g = M[1][0] * xyz[0] + M[1][1] * xyz[1] + M[1][2] * xyz[2]
  const b = M[2][0] * xyz[0] + M[2][1] * xyz[1] + M[2][2] * xyz[2]
  return [r, g, b]
}

/** OKLab to XYZ (D65) - inverse of xyzToOklab */
function oklabToXyz(lab: [number, number, number]): [number, number, number] {
  const LMStoOKLabInv = [
    [1.0000000000000002, 0.3963377773761742, 0.2158037573099136],
    [1.0000000000000002, -0.10556134565899428, -0.06385417282581354],
    [1.0000000000000002, -0.08948418209496575, -1.2914855378640917],
  ]
  const XYZtoLMSInv = [
    [1.2268798758459243, -0.5578149944602171, 0.2813910456659647],
    [-0.04057576223790869, 1.1122868293970594, -0.0719210667754833],
    [-0.0763729487009728, -0.4214933324022432, 1.5869240198367816],
  ]
  const lmsLinear = [
    LMStoOKLabInv[0][0] * lab[0] + LMStoOKLabInv[0][1] * lab[1] + LMStoOKLabInv[0][2] * lab[2],
    LMStoOKLabInv[1][0] * lab[0] + LMStoOKLabInv[1][1] * lab[1] + LMStoOKLabInv[1][2] * lab[2],
    LMStoOKLabInv[2][0] * lab[0] + LMStoOKLabInv[2][1] * lab[1] + LMStoOKLabInv[2][2] * lab[2],
  ]
  const lms = lmsLinear.map((c) => c * c * c) as [number, number, number]
  return [
    XYZtoLMSInv[0][0] * lms[0] + XYZtoLMSInv[0][1] * lms[1] + XYZtoLMSInv[0][2] * lms[2],
    XYZtoLMSInv[1][0] * lms[0] + XYZtoLMSInv[1][1] * lms[1] + XYZtoLMSInv[1][2] * lms[2],
    XYZtoLMSInv[2][0] * lms[0] + XYZtoLMSInv[2][1] * lms[1] + XYZtoLMSInv[2][2] * lms[2],
  ]
}

/** OKLCH to OKLab (L 0-1, C, H in degrees) */
function oklchToOklab(L: number, C: number, H: number): [number, number, number] {
  const Hrad = (H * Math.PI) / 180
  return [L, C * Math.cos(Hrad), C * Math.sin(Hrad)]
}

/** OKLCH (L 0-1, C, H degrees) to sRGB 0-1 */
function oklchToRgb(L: number, C: number, H: number): [number, number, number] {
  const lab = oklchToOklab(L, C, H)
  const xyz = oklabToXyz(lab)
  const linRgb = xyzToLinSrgb(xyz)
  return linRgb.map(delinearizeSrgb) as [number, number, number]
}

/** Format OKLCH for display (L as %, C and H rounded) */
function formatOklchDisplay(L: number, C: number, H: number): string {
  const Lpct = (L * 100).toFixed(2)
  const Cround = C.toFixed(4)
  const Hround = H.toFixed(2)
  return `oklch(${Lpct}% ${Cround} ${Hround})`
}

/** XYZ (D65) to OKLab */
function xyzToOklab(xyz: [number, number, number]): [number, number, number] {
  const XYZtoLMS = [
    [0.819022437996703, 0.3619062600528904, -0.1288737815209879],
    [0.0329836539323885, 0.9292868615863434, 0.0361446663506424],
    [0.0481771893596242, 0.2642395317527308, 0.6335478284694309],
  ]
  const LMStoOKLab = [
    [0.210454268309314, 0.7936177747023054, -0.0040720430116193],
    [1.9779985324311684, -2.4285922420485799, 0.450593709617411],
    [0.0259040424655478, 0.7827717124575296, -0.8086757549230774],
  ]
  const lms = [
    XYZtoLMS[0][0] * xyz[0] + XYZtoLMS[0][1] * xyz[1] + XYZtoLMS[0][2] * xyz[2],
    XYZtoLMS[1][0] * xyz[0] + XYZtoLMS[1][1] * xyz[1] + XYZtoLMS[1][2] * xyz[2],
    XYZtoLMS[2][0] * xyz[0] + XYZtoLMS[2][1] * xyz[1] + XYZtoLMS[2][2] * xyz[2],
  ].map((c) => Math.cbrt(c))
  return [
    LMStoOKLab[0][0] * lms[0] + LMStoOKLab[0][1] * lms[1] + LMStoOKLab[0][2] * lms[2],
    LMStoOKLab[1][0] * lms[0] + LMStoOKLab[1][1] * lms[1] + LMStoOKLab[1][2] * lms[2],
    LMStoOKLab[2][0] * lms[0] + LMStoOKLab[2][1] * lms[1] + LMStoOKLab[2][2] * lms[2],
  ]
}

/** OKLab to OKLCH (L in 0-1, C, H in degrees) */
function oklabToOklch(lab: [number, number, number]): {
  L: number
  C: number
  H: number
} {
  const L = lab[0]
  const C = Math.sqrt(lab[1] ** 2 + lab[2] ** 2)
  let H = (Math.atan2(lab[2], lab[1]) * 180) / Math.PI
  if (H < 0) H += 360
  return { L, C, H: Number.isNaN(H) ? 0 : H }
}

/** RGB 0-1 to OKLCH string for display */
export function rgbToOklchString(rgb: [number, number, number]): string {
  const xyz = linSrgbToXyz(rgb)
  const lab = xyzToOklab(xyz)
  const { L, C, H } = oklabToOklch(lab)
  const Lpct = (L * 100).toFixed(2)
  const Cround = C.toFixed(4)
  const Hround = H.toFixed(2)
  return `oklch(${Lpct}% ${Cround} ${Hround})`
}

/** RGB 0-1 to CMYK percentages */
export function rgbToCmyk(rgb: [number, number, number]): {
  c: number
  m: number
  y: number
  k: number
} {
  const [r, g, b] = rgb
  const k = 1 - Math.max(r, g, b)
  if (k >= 1) return { c: 0, m: 0, y: 0, k: 100 }
  const c = ((1 - r - k) / (1 - k)) * 100
  const m = ((1 - g - k) / (1 - k)) * 100
  const y = ((1 - b - k) / (1 - k)) * 100
  return {
    c: Math.round(c * 10) / 10,
    m: Math.round(m * 10) / 10,
    y: Math.round(y * 10) / 10,
    k: Math.round(k * 1000) / 10,
  }
}

export function rgbToCmykString(rgb: [number, number, number]): string {
  const { c, m, y, k } = rgbToCmyk(rgb)
  return `cmyk(${c}% ${m}% ${y}% ${k}%)`
}

/** RGB 0-1 to 6-digit hex (e.g. #6C47FF) */
export function rgbToHex(rgb: [number, number, number]): string {
  const r = Math.round(Math.min(1, Math.max(0, rgb[0])) * 255)
  const g = Math.round(Math.min(1, Math.max(0, rgb[1])) * 255)
  const b = Math.round(Math.min(1, Math.max(0, rgb[2])) * 255)
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase()
}

/**
 * Resolve an arbitrary CSS color string to RGB 0-1 using canvas (browser only).
 * Use when parsed formats fail. Returns null if not in browser or color invalid.
 */
function canvasResolveToRgb(colorString: string): [number, number, number] | null {
  if (typeof document === "undefined" || typeof CanvasRenderingContext2D === "undefined")
    return null
  try {
    const canvas = document.createElement("canvas")
    canvas.width = 1
    canvas.height = 1
    const ctx = canvas.getContext("2d")
    if (!ctx) return null
    ctx.fillStyle = colorString
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b] = Array.from(ctx.getImageData(0, 0, 1, 1).data)
    return [r / 255, g / 255, b / 255]
  } catch {
    return null
  }
}

/**
 * From computed CSS color string (e.g. "rgb(...)", "oklch(...)", "hsl(...)")
 * return { oklch: "oklch(...)", hex: "#..." } or null if unparseable.
 * Tries rgb(), oklch(), hsl(), and "transparent" so all tokens can show values.
 */
export function computedColorToOklchHex(computedColor: string): {
  oklch: string
  hex: string
} | null {
  const s = computedColor.trim().toLowerCase()
  if (s === "transparent") {
    return {
      oklch: "oklch(0% 0 0)",
      hex: "#000000",
    }
  }
  let rgb: [number, number, number] | null = parseRgbString(computedColor)
  if (!rgb) rgb = parseColorSrgbString(computedColor)
  let oklchDisplay: string
  if (rgb) {
    oklchDisplay = rgbToOklchString(rgb)
    return { oklch: oklchDisplay, hex: rgbToHex(rgb) }
  }
  const oklch = parseOklchString(computedColor)
  if (oklch) {
    oklchDisplay = formatOklchDisplay(oklch.L, oklch.C, oklch.H)
    rgb = oklchToRgb(oklch.L, oklch.C, oklch.H)
    return { oklch: oklchDisplay, hex: rgbToHex(rgb) }
  }
  rgb = parseHslString(computedColor)
  if (rgb) {
    return {
      oklch: rgbToOklchString(rgb),
      hex: rgbToHex(rgb),
    }
  }
  const canvasRgb = canvasResolveToRgb(computedColor)
  if (canvasRgb) {
    return {
      oklch: rgbToOklchString(canvasRgb),
      hex: rgbToHex(canvasRgb),
    }
  }
  return null
}

/**
 * From computed CSS color string (e.g. "rgb(108, 71, 255)") return
 * { oklch: "oklch(...)", cmyk: "cmyk(...)" } or null if unparseable.
 */
export function computedColorToOklchCmyk(computedColor: string): {
  oklch: string
  cmyk: string
} | null {
  const rgb = parseRgbString(computedColor)
  if (!rgb) return null
  return {
    oklch: rgbToOklchString(rgb),
    cmyk: rgbToCmykString(rgb),
  }
}

/** Get RGB 0-1 from computed CSS color string, or null if unparseable. */
function getRgbFromComputedColor(computedColor: string): [number, number, number] | null {
  const s = computedColor.trim().toLowerCase()
  if (s === "transparent") return [0, 0, 0]
  let rgb = parseRgbString(computedColor)
  if (!rgb) rgb = parseColorSrgbString(computedColor)
  if (rgb) return rgb
  const oklch = parseOklchString(computedColor)
  if (oklch) return oklchToRgb(oklch.L, oklch.C, oklch.H)
  rgb = parseHslString(computedColor)
  if (rgb) return rgb
  return canvasResolveToRgb(computedColor)
}

/**
 * Return black (#000000) or white (#ffffff) for optimal contrast on the given background.
 * Uses relative luminance (WCAG-style). Use with computed CSS color strings.
 */
export function getContrastForegroundFromComputedColor(computedColor: string): "#000000" | "#ffffff" {
  const rgb = getRgbFromComputedColor(computedColor)
  if (!rgb) return "#000000"
  const [r, g, b] = rgb.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminance > 0.179 ? "#000000" : "#ffffff"
}
