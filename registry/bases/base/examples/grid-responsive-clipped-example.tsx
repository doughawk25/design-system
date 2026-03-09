"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid, GridCell } from "@/registry/bases/base/ui/grid"

export default function GridResponsiveClippedExample() {
  return (
    <ExampleWrapper>
      <Example title="Responsive grid with clipped guides">
        <Grid columns={3} rows={2} gap={8} minHeight="100px">
          <GridCell column={1} row={1} colSpan={2} solid clipGuides>
            1 + 2
          </GridCell>
          <GridCell column={3} row={1} solid>
            3
          </GridCell>
          <GridCell column={1} row={2} solid>
            4
          </GridCell>
          <GridCell column={2} row={2} colSpan={2} solid clipGuides>
            5 + 6
          </GridCell>
        </Grid>
      </Example>
    </ExampleWrapper>
  )
}
