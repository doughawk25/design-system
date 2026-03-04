"use client"

import * as React from "react"
import { Copy } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const TYPOGRAPHY_SETTINGS = [
  {
    label: "H1",
    summary: "text-4xl · semibold",
    code: "scroll-m-20 text-4xl font-semibold tracking-tight text-balance",
  },
  {
    label: "H2",
    summary: "text-3xl · semibold",
    code: "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
  },
  {
    label: "H3",
    summary: "text-2xl · semibold",
    code: "scroll-m-20 text-2xl font-semibold tracking-tight",
  },
  {
    label: "H4",
    summary: "text-xl · semibold",
    code: "scroll-m-20 text-xl font-semibold tracking-tight",
  },
  {
    label: "Body",
    summary: "text-base · leading-7",
    code: "leading-7 [&:not(:first-child)]:mt-6",
  },
  {
    label: "Lead",
    summary: "text-xl · muted",
    code: "text-muted-foreground text-xl",
  },
  {
    label: "Large",
    summary: "text-lg · semibold",
    code: "text-lg font-semibold",
  },
  {
    label: "Small",
    summary: "text-sm · medium",
    code: "text-sm leading-none font-medium",
  },
  {
    label: "Muted",
    summary: "text-sm · muted-foreground",
    code: "text-muted-foreground text-sm",
  },
  {
    label: "Inline code",
    summary: "text-sm · mono",
    code: "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
  },
] as const

export function TypographySettingsHeader() {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      const text = TYPOGRAPHY_SETTINGS.map(
        (setting) => `${setting.label}: ${setting.code}`
      ).join("\n")
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore clipboard errors
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          {TYPOGRAPHY_SETTINGS.map((setting) => {
            const parts = setting.summary.split(" · ")
            return (
              <div
                key={setting.label}
                className="flex flex-wrap items-center gap-1.5"
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 text-sm font-semibold md:text-base"
                >
                  {setting.label}
                </Badge>
                <span className="text-muted-foreground text-xs font-medium px-0.5">
                  -
                </span>
                {parts.map((part) => (
                  <Badge
                    key={part}
                    variant="outline"
                    className="px-4 py-2 text-sm font-semibold md:text-base"
                  >
                    {part}
                  </Badge>
                ))}
              </div>
            )
          })}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="shrink-0"
        >
          <Copy className="mr-2 size-4" />
          {copied ? "Copied" : "Copy code"}
        </Button>
      </div>
      <div className="h-px w-full bg-border/60" />
    </section>
  )
}

