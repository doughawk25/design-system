"use client"

import { Plus } from "lucide-react"
import type { IconLibraryName } from "shadcn/icons"

import { useDesignSystemSearchParams } from "@/app/(create)/lib/search-params"

export function IconPlaceholder({
  ...props
}: {
  [K in IconLibraryName]: string
} & React.ComponentProps<"svg">) {
  const [{ iconLibrary }] = useDesignSystemSearchParams()
  const iconName = props[iconLibrary]

  if (!iconName) {
    return null
  }

  return <Plus className="h-6 w-6" {...props} />
}
