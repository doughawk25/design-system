"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Icons } from "@/components/icons"

export function UiShowcaseHeaderLogo() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/ui"

  if (isHome) {
    return (
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-foreground font-semibold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        aria-label="Close and go back"
      >
        <Icons.logo className="h-5 w-auto" />
        <span aria-hidden="true" className="h-5 w-px bg-border" />
        <span>seed design system</span>
      </button>
    )
  }

  return (
    <Link
      href="/ui"
      className="flex items-center gap-2 text-foreground font-semibold hover:underline"
    >
      <Icons.logo className="h-5 w-auto" />
      <span aria-hidden="true" className="h-5 w-px bg-border" />
      <span>seed design system</span>
    </Link>
  )
}
