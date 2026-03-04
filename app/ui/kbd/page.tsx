import { KbdShowcase } from "@/components/ui-showcase/kbd-showcase"

export default function KbdPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Kbd
      </h1>
      <KbdShowcase />
    </div>
  )
}
