import Link from "next/link"
import { Component, LayoutGrid, Palette, Paintbrush, Type } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

const cards = [
  { href: "/ui/tokens", label: "Color", icon: Palette },
  { href: "/ui/icons", label: "Icons", icon: LayoutGrid },
  { href: "/ui/typography", label: "Type", icon: Type },
  { href: "/ui/styles", label: "Effects", icon: Paintbrush },
  { href: "/ui/button", label: "Components", icon: Component },
] as const

export default function UiShowcasePage() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 block h-full rounded-xl transition-transform hover:scale-[1.02]"
        >
          <Card className="surface-blur-strong relative flex h-full min-h-[200px] flex-col p-6">
            <CardContent className="flex flex-1 flex-col p-0">
              <span className="text-card-foreground text-lg font-semibold">{label}</span>
              <span className="text-card-foreground/90 absolute bottom-6 right-6">
                <Icon className="size-16" strokeWidth={1.5} />
              </span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
