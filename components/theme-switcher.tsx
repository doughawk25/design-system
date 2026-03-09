"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { useMetaColor } from "@/hooks/use-meta-color"
import { withThemeTransition } from "@/lib/theme-transition"
import { Switch } from "@/components/ui/switch"

/**
 * Theme switcher using the base toggle/switch component styling.
 */
export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const { setMetaColor, metaColor } = useMetaColor()

  React.useEffect(() => {
    setMetaColor(metaColor)
  }, [metaColor, setMetaColor])

  const toggleTheme = React.useCallback(() => {
    withThemeTransition(() => {
      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    })
  }, [resolvedTheme, setTheme])

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        toggleTheme()
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [toggleTheme])

  const isDark = resolvedTheme === "dark"

  return (
    <div className="extend-touch-target flex items-center">
      <Switch
        aria-label="Toggle dark mode"
        checked={isDark}
        onCheckedChange={(checked) =>
          withThemeTransition(() => setTheme(checked ? "dark" : "light"))
        }
      />
    </div>
  )
}
