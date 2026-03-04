import { SpaceTokensShowcase } from "@/components/ui-showcase/tokens-showcase"

export default function SpacePage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Space
      </h1>
      <SpaceTokensShowcase />
    </div>
  )
}

