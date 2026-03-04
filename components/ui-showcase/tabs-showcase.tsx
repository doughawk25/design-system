"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function TabsShowcase() {
  return (
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
  )
}
