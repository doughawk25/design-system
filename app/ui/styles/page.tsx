import { StylesShowcase } from "@/components/ui-showcase/styles-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function StylesPage() {
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/styles")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Effects"
        description="Design system effects such as shadows. For color tokens, see Color. For space and radius tokens, see Space."
        pageNumber={pageNumber}
      />
      <StylesShowcase />
    </div>
  )
}
