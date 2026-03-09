"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid, GridCell } from "@/registry/bases/base/ui/grid"

export default function GridOverlayingExample() {
  return (
    <ExampleWrapper>
      <Example title="Overlaying cells">
        <Grid columns={3} rows={2} gap={8} minHeight="120px">
          <GridCell solid>1</GridCell>
          <GridCell solid overlay className="rounded-md border-2 border-primary shadow-md">
            2
          </GridCell>
          <GridCell solid className="text-muted-foreground text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
            felis
          </GridCell>
          <GridCell solid>3</GridCell>
          <GridCell solid>4</GridCell>
        </Grid>
      </Example>
    </ExampleWrapper>
  )
}
