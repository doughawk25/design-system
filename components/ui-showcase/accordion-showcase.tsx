"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function AccordionShowcase() {
  return (
    <PreviewCard className="w-full">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content for item 1.</AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content for item 2.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </PreviewCard>
  )
}
