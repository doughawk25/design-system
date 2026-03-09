import { ColorTokensShowcase } from "@/components/ui-showcase/tokens-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function ColorPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/color")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/color")
  return (
    <div className="motion-fade-in flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Color"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <ColorTokensShowcase />
    </div>
  )
}

