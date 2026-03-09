import { ButtonShowcase } from "@/components/ui-showcase/button-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function ButtonPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/button")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/button")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Button"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <ButtonShowcase />
    </div>
  )
}
