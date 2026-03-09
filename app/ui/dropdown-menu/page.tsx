import { DropdownMenuShowcase } from "@/components/ui-showcase/dropdown-menu-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function DropdownMenuPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/dropdown-menu")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/dropdown-menu")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Dropdown Menu"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <DropdownMenuShowcase />
    </div>
  )
}
