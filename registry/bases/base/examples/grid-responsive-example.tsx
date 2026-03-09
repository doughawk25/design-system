"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid, GridCell } from "@/registry/bases/base/ui/grid"

export default function GridResponsiveExample() {
  return (
    <ExampleWrapper>
      <Example title="Responsive grid">
        <Grid columns={3} rows={2} gap={8} minHeight="100px">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <GridCell key={n}>{n}</GridCell>
          ))}
        </Grid>
      </Example>
    </ExampleWrapper>
  )
}
