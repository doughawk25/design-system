import { DialogShowcase } from "@/components/ui-showcase/dialog-showcase"

export default function DialogPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Dialog
      </h1>
      <DialogShowcase />
    </div>
  )
}
