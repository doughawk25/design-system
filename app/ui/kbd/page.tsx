import { KbdShowcase } from "@/components/ui-showcase/kbd-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function KbdPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/kbd")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/kbd")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Kbd"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <KbdShowcase />
    </div>
  )
}
