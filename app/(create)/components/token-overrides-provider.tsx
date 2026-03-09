"use client"

import * as React from "react"

import type { TokenOverrides } from "@/app/(create)/hooks/use-iframe-sync"

type TokenOverridesContextValue = [
  TokenOverrides,
  React.Dispatch<React.SetStateAction<TokenOverrides>>,
]

const TokenOverridesContext =
  React.createContext<TokenOverridesContextValue | null>(null)

export function TokenOverridesProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [overrides, setOverrides] = React.useState<TokenOverrides>({})
  const value = React.useMemo<TokenOverridesContextValue>(
    () => [overrides, setOverrides],
    [overrides]
  )
  return (
    <TokenOverridesContext.Provider value={value}>
      {children}
    </TokenOverridesContext.Provider>
  )
}

export function useTokenOverrides() {
  const ctx = React.useContext(TokenOverridesContext)
  if (!ctx) {
    throw new Error("useTokenOverrides must be used within TokenOverridesProvider")
  }
  return ctx
}
