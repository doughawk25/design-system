"use client"

import * as React from "react"

import { cn } from "@/registry/bases/base/lib/utils"

export interface GridProps extends React.ComponentProps<"div"> {
  /** Number of columns or template string (e.g. "1fr 1fr 1fr") */
  columns?: number | string
  /** Number of rows or template string */
  rows?: number | string
  /** Gap between cells (CSS value or Tailwind gap class) */
  gap?: number | string
  /** Show horizontal guide lines between rows */
  showRowGuides?: boolean
  /** Show vertical guide lines between columns */
  showColumnGuides?: boolean
  /** Minimum height of the grid area */
  minHeight?: string | number
}

function toTemplate(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined
  if (typeof value === "number") return `repeat(${value}, 1fr)`
  return value
}

export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      columns,
      rows,
      gap = 8,
      showRowGuides = true,
      showColumnGuides = true,
      minHeight,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const colTemplate = toTemplate(columns)
    const rowTemplate = toTemplate(rows)
    const gapValue = typeof gap === "number" ? `${gap}px` : gap
    const numCols =
      typeof columns === "number"
        ? columns
        : typeof columns === "string"
          ? columns.split(" ").length
          : 1
    const numRows =
      typeof rows === "number"
        ? rows
        : typeof rows === "string"
          ? rows.split(" ").length
          : 1
    const showGuides = showRowGuides || showColumnGuides

    const gridStyle: React.CSSProperties = {
      ...style,
      display: "grid",
      gridTemplateColumns: colTemplate ?? "repeat(3, 1fr)",
      gridTemplateRows: rowTemplate ?? "repeat(2, 1fr)",
      gap: gapValue,
      minHeight: minHeight != null ? String(minHeight) : "120px",
    }

    return (
      <div ref={ref} className={cn("relative rounded-lg border border-border", className)} {...props}>
        {showGuides && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid"
            style={{
              gridTemplateColumns: colTemplate ?? "repeat(3, 1fr)",
              gridTemplateRows: rowTemplate ?? "repeat(2, 1fr)",
              gap: gapValue,
            }}
          >
            {Array.from({ length: numRows * numCols }, (_, i) => (
              <div
                key={i}
                className={cn(
                  "border-border",
                  showColumnGuides && "border-r",
                  showRowGuides && "border-b"
                )}
              />
            ))}
          </div>
        )}
        <div className="relative grid" style={gridStyle}>
          {children}
        </div>
      </div>
    )
  }
)
Grid.displayName = "Grid"

export interface GridCellProps extends React.ComponentProps<"div"> {
  /** Column start (1-based) or span "1 / 3" */
  column?: number | string
  /** Row start (1-based) or span */
  row?: number | string
  /** Column span (number of columns) */
  colSpan?: number
  /** Row span (number of rows) */
  rowSpan?: number
  /** Fill with background to occlude guide lines */
  solid?: boolean
  /** Cell overlays previous cells (higher z-index) */
  overlay?: boolean
  /** Clip guide lines at cell bounds */
  clipGuides?: boolean
}

export const GridCell = React.forwardRef<HTMLDivElement, GridCellProps>(
  (
    {
      className,
      column,
      row,
      colSpan = 1,
      rowSpan = 1,
      solid = false,
      overlay = false,
      clipGuides = false,
      style,
      ...props
    },
    ref
  ) => {
    const gridColumn =
      column === undefined
        ? undefined
        : typeof column === "string"
          ? column
          : colSpan > 1
            ? `${column} / span ${colSpan}`
            : String(column)
    const gridRow =
      row === undefined
        ? undefined
        : typeof row === "string"
          ? row
          : rowSpan > 1
            ? `${row} / span ${rowSpan}`
            : String(row)

    return (
      <div
        ref={ref}
        className={cn(
          "border-border flex min-h-0 min-w-0 items-center justify-center p-2 text-sm text-foreground",
          solid && "bg-background",
          overlay && "relative z-10",
          clipGuides && "overflow-hidden",
          className
        )}
        style={{
          ...style,
          gridColumn,
          gridRow,
        }}
        {...props}
      />
    )
  }
)
GridCell.displayName = "GridCell"
