import { DropdownMenuShowcase } from "@/components/ui-showcase/dropdown-menu-showcase"

export default function DropdownMenuPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Dropdown Menu
      </h1>
      <DropdownMenuShowcase />
    </div>
  )
}
