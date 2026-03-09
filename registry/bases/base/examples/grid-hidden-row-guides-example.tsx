"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid } from "@/registry/bases/base/ui/grid"

export default function GridHiddenRowGuidesExample() {
  return (
    <ExampleWrapper>
      <Example title="Hidden row guides">
        <Grid
          columns={3}
          rows={2}
          gap={8}
          showRowGuides={false}
          showColumnGuides={true}
          minHeight="140px"
        />
      </Example>
    </ExampleWrapper>
  )
}
