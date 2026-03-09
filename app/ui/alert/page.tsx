import { AlertShowcase } from "@/components/ui-showcase/alert-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function AlertPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/alert")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/alert")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Alert"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <AlertShowcase />
    </div>
  )
}
