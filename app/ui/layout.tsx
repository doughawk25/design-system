import { UiShowcaseLayoutContent } from "@/components/ui-showcase/layout-content"

export default function UiLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <UiShowcaseLayoutContent>{children}</UiShowcaseLayoutContent>
    </div>
  )
}

