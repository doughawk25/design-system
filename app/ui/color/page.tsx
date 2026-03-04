import { ColorTokensShowcase } from "@/components/ui-showcase/tokens-showcase"

export default function ColorPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Color
      </h1>
      <ColorTokensShowcase />
    </div>
  )
}

