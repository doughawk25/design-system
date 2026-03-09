"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid, GridCell } from "@/registry/bases/base/ui/grid"

export default function GridSpecificClippingExample() {
  return (
    <ExampleWrapper>
      <Example title="Specific guide clipping">
        <Grid columns={3} rows={2} gap={8} minHeight="100px">
          <GridCell solid>1</GridCell>
          <GridCell solid clipGuides>
            2
          </GridCell>
          <GridCell solid>3</GridCell>
          <GridCell solid clipGuides>4</GridCell>
          <GridCell solid>5</GridCell>
        </Grid>
      </Example>
    </ExampleWrapper>
  )
}
