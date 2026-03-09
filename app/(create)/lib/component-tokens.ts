/**
 * Semantic design tokens used by components.
 * Exposed on component preview pages so users can override at a system level.
 */

export const SEMANTIC_TOKENS = [
  { id: "primary", label: "Primary", type: "color" as const },
  { id: "primary-foreground", label: "Primary foreground", type: "color" as const },
  { id: "background", label: "Background", type: "color" as const },
  { id: "foreground", label: "Foreground", type: "color" as const },
  { id: "input", label: "Input", type: "color" as const },
  { id: "ring", label: "Ring / focus", type: "color" as const },
  { id: "muted", label: "Muted", type: "color" as const },
  { id: "muted-foreground", label: "Muted foreground", type: "color" as const },
  { id: "accent", label: "Accent", type: "color" as const },
  { id: "accent-foreground", label: "Accent foreground", type: "color" as const },
  { id: "border", label: "Border", type: "color" as const },
  { id: "destructive", label: "Destructive", type: "color" as const },
  { id: "destructive-foreground", label: "Destructive foreground", type: "color" as const },
  { id: "card", label: "Card", type: "color" as const },
  { id: "card-foreground", label: "Card foreground", type: "color" as const },
  { id: "popover", label: "Popover", type: "color" as const },
  { id: "popover-foreground", label: "Popover foreground", type: "color" as const },
  { id: "secondary", label: "Secondary", type: "color" as const },
  { id: "secondary-foreground", label: "Secondary foreground", type: "color" as const },
] as const

export type SemanticTokenId = (typeof SEMANTIC_TOKENS)[number]["id"]

/** Map: component name -> token ids used by that component */
export const COMPONENT_TOKENS: Record<string, SemanticTokenId[]> = {
  switch: [
    "primary",
    "primary-foreground",
    "input",
    "background",
    "foreground",
    "ring",
  ],
  button: [
    "primary",
    "primary-foreground",
    "secondary",
    "secondary-foreground",
    "destructive",
    "destructive-foreground",
    "muted",
    "muted-foreground",
    "ring",
    "border",
  ],
  input: ["input", "ring", "foreground", "background", "border", "destructive"],
  card: ["card", "card-foreground", "border"],
  "select": ["background", "foreground", "ring", "border", "input"],
  "checkbox": ["primary", "primary-foreground", "ring", "border", "background", "foreground"],
  "radio-group": ["primary", "ring", "foreground"],
  "slider": ["primary", "primary-foreground", "muted", "ring"],
  "tabs": ["muted", "muted-foreground", "background", "foreground", "ring", "border"],
  "badge": ["primary", "primary-foreground", "secondary", "secondary-foreground", "destructive", "destructive-foreground", "ring", "border"],
} as const

export function getTokensForComponent(componentName: string): (typeof SEMANTIC_TOKENS)[number][] {
  const ids = COMPONENT_TOKENS[componentName]
  if (!ids?.length) return []
  const byId = Object.fromEntries(SEMANTIC_TOKENS.map((t) => [t.id, t]))
  return ids.map((id) => byId[id]).filter(Boolean)
}

export function getTokenLabel(tokenId: string): string {
  return SEMANTIC_TOKENS.find((t) => t.id === tokenId)?.label ?? tokenId
}
