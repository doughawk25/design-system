"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid, GridCell } from "@/registry/bases/base/ui/grid"

export default function GridSolidExample() {
  return (
    <ExampleWrapper>
      <Example title="Solid cells">
        <Grid columns={3} rows={2} gap={8} minHeight="100px">
          <GridCell solid>1</GridCell>
          <GridCell solid>2</GridCell>
          <GridCell solid>3</GridCell>
          <GridCell solid>4</GridCell>
          <GridCell solid>5</GridCell>
          <GridCell solid>6</GridCell>
        </Grid>
      </Example>
    </ExampleWrapper>
  )
}
