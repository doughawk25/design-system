import { AspectRatioShowcase } from "@/components/ui-showcase/aspect-ratio-showcase"

export default function AspectRatioPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Aspect Ratio
      </h1>
      <AspectRatioShowcase />
    </div>
  )
}
