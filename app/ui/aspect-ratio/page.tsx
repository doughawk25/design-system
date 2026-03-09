import { AspectRatioShowcase } from "@/components/ui-showcase/aspect-ratio-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function AspectRatioPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/aspect-ratio")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/aspect-ratio")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Aspect Ratio"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <AspectRatioShowcase />
    </div>
  )
}
