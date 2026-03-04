import { InputShowcase } from "@/components/ui-showcase/input-showcase"

export default function InputPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Input
      </h1>
      <InputShowcase />
    </div>
  )
}
