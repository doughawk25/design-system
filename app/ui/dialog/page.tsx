import { DialogShowcase } from "@/components/ui-showcase/dialog-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function DialogPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/dialog")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/dialog")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Dialog"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <DialogShowcase />
    </div>
  )
}
