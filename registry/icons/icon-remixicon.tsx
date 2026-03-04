"use client"

import * as React from "react"
import { Copy } from "lucide-react"

export function IconRemixicon({ name, ...props }: { name: string } & React.SVGAttributes<SVGElement>) {
  return <Copy className="size-5" {...props} />
}
