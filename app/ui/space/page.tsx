import { SpaceTokensShowcase } from "@/components/ui-showcase/tokens-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function SpacePage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/space")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/space")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Space"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <SpaceTokensShowcase />
    </div>
  )
}

