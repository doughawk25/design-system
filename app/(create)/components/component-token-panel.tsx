"use client"

import * as React from "react"

import {
  getTokensForComponent,
  type SemanticTokenId,
} from "@/app/(create)/lib/component-tokens"
import { useTokenOverrides } from "@/app/(create)/components/token-overrides-provider"
import {
  Picker,
  PickerContent,
  PickerTrigger,
} from "@/app/(create)/components/picker"
import { useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"
import { Button } from "@/registry/new-york-v4/ui/button"
import { FieldGroup } from "@/registry/new-york-v4/ui/field"
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/registry/new-york-v4/ui/field"
import { Input } from "@/registry/new-york-v4/ui/input"

export function ComponentTokenPanel({
  isMobile,
  anchorRef,
}: {
  isMobile: boolean
  anchorRef: React.RefObject<HTMLDivElement | null>
}) {
  const [params] = useDesignSystemSearchParams()
  const [overrides, setOverrides] = useTokenOverrides()
  const tokens = React.useMemo(
    () => getTokensForComponent(params.item),
    [params.item]
  )
  const componentLabel = params.item === "preview" ? "..." : params.item
  const hasTokens = tokens.length > 0

  const setToken = React.useCallback(
    (tokenId: SemanticTokenId, value: string) => {
      setOverrides((prev) => {
        const next = { ...prev }
        if (value.trim() === "") {
          delete next[tokenId]
        } else {
          next[tokenId] = value.trim()
        }
        return next
      })
    },
    [setOverrides]
  )

  const resetAll = React.useCallback(() => {
    setOverrides((prev) => {
      const next = { ...prev }
      tokens.forEach((t) => delete next[t.id])
      return next
    })
  }, [tokens, setOverrides])

  const hasOverrides = tokens.some((t) => overrides[t.id])

  return (
    <div className="group/picker relative">
      <Picker>
        <PickerTrigger>
          <div className="flex flex-col justify-start text-left">
            <div className="text-muted-foreground text-xs">
              Component tokens
            </div>
            <div className="text-foreground text-sm font-medium capitalize">
              {hasTokens ? componentLabel : "—"}
            </div>
          </div>
          <div className="text-muted-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v18" />
              <path d="m8 7 4-4 4 4" />
              <path d="m8 17 4 4 4-4" />
            </svg>
          </div>
        </PickerTrigger>
        <PickerContent
          anchor={isMobile ? anchorRef : undefined}
          side={isMobile ? "top" : "right"}
          align={isMobile ? "center" : "start"}
          className="md:w-72"
        >
          {hasTokens ? (
            <div className="flex flex-col gap-3 p-1">
              <FieldGroup className="gap-2">
                <FieldDescription className="text-xs">
                  Override design tokens for this component. Changes apply at the
                  system level in the preview.
                </FieldDescription>
                {tokens.map((token) => (
                  <Field key={token.id} orientation="horizontal">
                    <FieldLabel className="min-w-[10rem] shrink-0">
                      <FieldTitle className="text-xs font-medium">
                        {token.label}
                      </FieldTitle>
                    </FieldLabel>
                    <FieldContent className="flex items-center gap-2">
                      {token.type === "color" && (
                        <input
                          type="color"
                          aria-label={`${token.label} color`}
                          className="bg-border size-8 cursor-pointer rounded border"
                          value={
                            /^#[0-9A-Fa-f]{6}$/.test(overrides[token.id] ?? "")
                              ? (overrides[token.id] as string)
                              : "#888888"
                          }
                          onChange={(e) =>
                            setToken(token.id, e.target.value)
                          }
                        />
                      )}
                      <Input
                        type="text"
                        placeholder="Theme default"
                        className="font-mono text-xs h-8"
                        value={overrides[token.id] ?? ""}
                        onChange={(e) =>
                          setToken(token.id, e.target.value)
                        }
                      />
                    </FieldContent>
                  </Field>
                ))}
              </FieldGroup>
              {hasOverrides && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-full text-xs"
                  onClick={resetAll}
                >
                  Reset all to theme default
                </Button>
              )}
            </div>
          ) : (
            <div className="text-muted-foreground px-2 py-4 text-center text-sm">
              {params.item === "preview" || !params.item
                ? "Select a component to edit its tokens."
                : `No token overrides for "${componentLabel}".`}
            </div>
          )}
        </PickerContent>
      </Picker>
    </div>
  )
}
