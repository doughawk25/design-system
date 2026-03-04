"use client"

import * as React from "react"
import Script from "next/script"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { useMetaColor } from "@/hooks/use-meta-color"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Kbd } from "@/registry/new-york-v4/ui/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/registry/new-york-v4/ui/tooltip"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs"

export const DARK_MODE_FORWARD_TYPE = "dark-mode-forward"

export function ModeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme()
  const { setMetaColor, metaColor } = useMetaColor()

  React.useEffect(() => {
    setMetaColor(metaColor)
  }, [metaColor, setMetaColor])

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
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

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="extend-touch-target">
          <Tabs
            value={resolvedTheme === "dark" ? "dark" : "light"}
            onValueChange={(value) =>
              setTheme((value as "light" | "dark") ?? "light")
            }
            className="flex-row gap-0"
          >
            <TabsList
              aria-label="Select theme"
              className="h-8"
            >
              <TabsTrigger
                value="light"
                aria-label="Light mode"
                className="h-8 w-8 px-0"
              >
                <SunIcon className="size-4" />
              </TabsTrigger>
              <TabsTrigger
                value="dark"
                aria-label="Dark mode"
                className="h-8 w-8 px-0"
              >
                <MoonIcon className="size-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </TooltipTrigger>
      <TooltipContent className="flex items-center gap-2 pr-1">
        Toggle mode <Kbd>D</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}

/** Registers the D key to toggle light/dark mode. Renders nothing. Use when you want the shortcut without the switcher UI. */
export function ThemeShortcutListener() {
  const { setTheme, resolvedTheme } = useTheme()
  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
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

  return null
}

export function DarkModeScript() {
  return (
    <Script
      id="dark-mode-listener"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `
            (function() {
              // Forward D key
              document.addEventListener('keydown', function(e) {
                if ((e.key === 'd' || e.key === 'D') && !e.metaKey && !e.ctrlKey && !e.altKey) {
                  if (
                    (e.target instanceof HTMLElement && e.target.isContentEditable) ||
                    e.target instanceof HTMLInputElement ||
                    e.target instanceof HTMLTextAreaElement ||
                    e.target instanceof HTMLSelectElement
                  ) {
                    return;
                  }
                  e.preventDefault();
                  if (window.parent && window.parent !== window) {
                    window.parent.postMessage({
                      type: '${DARK_MODE_FORWARD_TYPE}',
                      key: e.key
                    }, '*');
                  }
                }
              });

            })();
          `,
      }}
    />
  )
}
