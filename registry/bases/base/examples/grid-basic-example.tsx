"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid, GridCell } from "@/registry/bases/base/ui/grid"

export default function GridBasicExample() {
  return (
    <ExampleWrapper>
      <Example title="Basic grid">
        <Grid columns={3} rows={2} gap={8} minHeight="100px">
          <GridCell>1</GridCell>
          <GridCell>2</GridCell>
          <GridCell>3</GridCell>
          <GridCell>4</GridCell>
          <GridCell>5</GridCell>
          <GridCell>6</GridCell>
        </Grid>
      </Example>
    </ExampleWrapper>
  )
}
