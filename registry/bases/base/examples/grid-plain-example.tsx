"use client"

import {
  Example,
  ExampleWrapper,
} from "@/registry/bases/base/components/example"
import { Grid } from "@/registry/bases/base/ui/grid"

export default function GridPlainExample() {
  return (
    <ExampleWrapper>
      <Example title="Plain grid">
        <Grid columns={3} rows={2} gap={8} minHeight="140px" />
      </Example>
    </ExampleWrapper>
  )
}
