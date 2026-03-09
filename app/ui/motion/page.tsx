import { MotionShowcase } from "@/components/ui-showcase/motion-showcase"
import { UiShowcaseSectionHeader } from "@/components/ui-showcase/section-header"
import { getUiShowcaseSectionPageNumber } from "@/lib/ui-showcase-config"

export default function MotionPage() {
  const pageNumber = getUiShowcaseSectionPageNumber("/ui/motion")
  return (
    <div className="flex w-full flex-col gap-6">
      <UiShowcaseSectionHeader
        title="Motion"
        description="Animation and transition patterns for the design system. Use motion to reinforce hierarchy, provide feedback, and respect reduced motion preferences."
        pageNumber={pageNumber}
      />
      <MotionShowcase />
    </div>
  )
}
