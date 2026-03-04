import { ButtonShowcase } from "@/components/ui-showcase/button-showcase"

export default function ButtonPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Button
      </h1>
      <ButtonShowcase />
    </div>
  )
}
