import { AccordionShowcase } from "@/components/ui-showcase/accordion-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { UI_SHOWCASE_ITEMS, getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function AccordionPage() {
  const item = UI_SHOWCASE_ITEMS.find((e) => e.path === "/ui/accordion")
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/accordion")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Accordion"
        description={item?.description}
        pageNumber={pageNumber}
      />
      <AccordionShowcase />
    </div>
  )
}
