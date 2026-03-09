"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid } from "@/registry/bases/base/ui/grid"

export default function GridHiddenColumnGuidesExample() {
  return (
    <ExampleWrapper>
      <Example title="Hidden column guides">
        <Grid
          columns={3}
          rows={2}
          gap={8}
          showRowGuides={true}
          showColumnGuides={false}
          minHeight="140px"
        />
      </Example>
    </ExampleWrapper>
  )
}
