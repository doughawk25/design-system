import { InputShowcase } from "@/components/ui-showcase/input-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function InputPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/input")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/input")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Input"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <InputShowcase />
    </div>
  )
}
