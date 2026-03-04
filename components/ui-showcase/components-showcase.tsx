"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PreviewCard } from "@/components/ui-showcase/preview-card"
import { Section } from "@/components/ui-showcase/section"

const COMPONENT_IDS = [
  "button",
  "input",
  "alert",
  "tabs",
  "kbd",
  "accordion",
  "dialog",
  "dropdown-menu",
  "aspect-ratio",
] as const

export { COMPONENT_IDS }

export function ComponentsShowcase() {
  return (
    <div className="flex flex-col gap-12">
      <Section id="button" title="Button">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <PreviewCard label="Variants">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </PreviewCard>
          <PreviewCard label="Sizes">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🔘</Button>
          </PreviewCard>
          <PreviewCard label="Disabled">
            <Button disabled>Disabled</Button>
          </PreviewCard>
        </div>
      </Section>

      <Section id="input" title="Input">
        <div className="grid gap-4 sm:grid-cols-2">
          <PreviewCard label="Default">
            <Input placeholder="Placeholder" className="w-64" />
          </PreviewCard>
          <PreviewCard label="Disabled">
            <Input disabled placeholder="Disabled" className="w-64" />
          </PreviewCard>
          <PreviewCard label="Error (aria-invalid)">
            <Input
              aria-invalid
              defaultValue="Invalid value"
              className="w-64"
            />
          </PreviewCard>
        </div>
      </Section>

      <Section id="alert" title="Alert">
        <div className="grid gap-4 sm:grid-cols-2">
          <PreviewCard label="Default" className="w-full">
            <Alert className="w-full max-w-md">
              <AlertTitle>Title</AlertTitle>
              <AlertDescription>Description text for the alert.</AlertDescription>
            </Alert>
          </PreviewCard>
          <PreviewCard label="Destructive" className="w-full">
            <Alert variant="destructive" className="w-full max-w-md">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong.</AlertDescription>
            </Alert>
          </PreviewCard>
        </div>
      </Section>

      <Section id="tabs" title="Tabs">
        <div className="grid gap-4 sm:grid-cols-2">
          <PreviewCard label="Default variant" className="w-full">
            <Tabs defaultValue="one" className="w-full max-w-md">
              <TabsList>
                <TabsTrigger value="one">One</TabsTrigger>
                <TabsTrigger value="two">Two</TabsTrigger>
                <TabsTrigger value="three">Three</TabsTrigger>
              </TabsList>
              <TabsContent value="one">Content one</TabsContent>
              <TabsContent value="two">Content two</TabsContent>
              <TabsContent value="three">Content three</TabsContent>
            </Tabs>
          </PreviewCard>
          <PreviewCard label="Line variant" className="w-full">
            <Tabs defaultValue="a" className="w-full max-w-md">
              <TabsList variant="line">
                <TabsTrigger value="a">Tab A</TabsTrigger>
                <TabsTrigger value="b">Tab B</TabsTrigger>
              </TabsList>
              <TabsContent value="a">Content A</TabsContent>
              <TabsContent value="b">Content B</TabsContent>
            </Tabs>
          </PreviewCard>
        </div>
      </Section>

      <Section id="kbd" title="Kbd">
        <div className="grid gap-4 sm:grid-cols-2">
          <PreviewCard label="Single key">
            <Kbd>⌘</Kbd>
            <Kbd>Enter</Kbd>
          </PreviewCard>
          <PreviewCard label="Key combo (KbdGroup)">
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </PreviewCard>
        </div>
      </Section>

      <Section id="accordion" title="Accordion">
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
      </Section>

      <Section id="dialog" title="Dialog">
        <PreviewCard label="Trigger to open">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog title</DialogTitle>
                <DialogDescription>
                  Optional description for the dialog.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter showCloseButton>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PreviewCard>
      </Section>

      <Section id="dropdown-menu" title="Dropdown menu">
        <PreviewCard label="Trigger to open">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>Item one</DropdownMenuItem>
              <DropdownMenuItem>Item two</DropdownMenuItem>
              <DropdownMenuItem>Item three</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </PreviewCard>
      </Section>

      <Section id="aspect-ratio" title="Aspect ratio">
        <PreviewCard label="16/9" className="w-full max-w-md">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md bg-muted">
            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
              Placeholder
            </div>
          </AspectRatio>
        </PreviewCard>
      </Section>
    </div>
  )
}
