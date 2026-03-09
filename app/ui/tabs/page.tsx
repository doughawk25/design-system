import { TabsShowcase } from "@/components/ui-showcase/tabs-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function TabsPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/tabs")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/tabs")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Tabs"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <TabsShowcase />
    </div>
  )
}
