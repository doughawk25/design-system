import { StylesShowcase } from "@/components/ui-showcase/styles-showcase"

export default function StylesPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Effects
      </h1>
      <p className="text-muted-foreground max-w-xl text-sm">
        Design system effects such as shadows. For color tokens, see Color. For
        space and radius tokens, see Space.
      </p>
      <StylesShowcase />
    </div>
  )
}
