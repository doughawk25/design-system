import { AccordionShowcase } from "@/components/ui-showcase/accordion-showcase"

export default function AccordionPage() {
  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        Accordion
      </h1>
      <AccordionShowcase />
    </div>
  )
}
