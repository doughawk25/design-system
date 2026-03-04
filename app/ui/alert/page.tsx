import { AlertShowcase } from "@/components/ui-showcase/alert-showcase"

export default function AlertPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Alert
      </h1>
      <AlertShowcase />
    </div>
  )
}
