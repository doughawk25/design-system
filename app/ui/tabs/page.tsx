import { TabsShowcase } from "@/components/ui-showcase/tabs-showcase"

export default function TabsPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Tabs
      </h1>
      <TabsShowcase />
    </div>
  )
}
