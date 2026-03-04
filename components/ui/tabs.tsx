"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

type TabsContextValue = {
  orientation: "horizontal" | "vertical"
  indicatorRect: {
    left: number
    width: number
    top: number
    height: number
  } | null
  listRef: React.RefObject<HTMLDivElement>
  registerTrigger: (value: string, el: HTMLButtonElement | null) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

function Tabs({
  className,
  orientation = "horizontal",
  value,
  defaultValue,
  onValueChange,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  const [indicatorRect, setIndicatorRect] = React.useState<{
    left: number
    width: number
    top: number
    height: number
  } | null>(null)

  const listRef = React.useRef<HTMLDivElement | null>(null)
  const triggersRef = React.useRef(new Map<string, HTMLButtonElement>())

  const [currentValue, setCurrentValue] = React.useState<string | undefined>(
    () => (value as string | undefined) ?? (defaultValue as string | undefined)
  )

  React.useEffect(() => {
    if (value !== undefined) {
      setCurrentValue(value as string)
    }
  }, [value])

  const updateIndicator = React.useCallback(() => {
    if (!currentValue) {
      setIndicatorRect(null)
      return
    }

    const listEl = listRef.current
    const triggerEl = triggersRef.current.get(currentValue)

    if (!listEl || !triggerEl) {
      setIndicatorRect(null)
      return
    }

    const listRect = listEl.getBoundingClientRect()
    const triggerRect = triggerEl.getBoundingClientRect()

    setIndicatorRect({
      left: triggerRect.left - listRect.left,
      width: triggerRect.width,
      top: triggerRect.top - listRect.top,
      height: triggerRect.height,
    })
  }, [currentValue])

  const registerTrigger = React.useCallback(
    (triggerValue: string, el: HTMLButtonElement | null) => {
      if (el) {
        triggersRef.current.set(triggerValue, el)
      } else {
        triggersRef.current.delete(triggerValue)
      }

      if (triggerValue === currentValue) {
        requestAnimationFrame(updateIndicator)
      }
    },
    [currentValue, updateIndicator]
  )

  React.useEffect(() => {
    updateIndicator()
  }, [updateIndicator])

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const handleResize = () => updateIndicator()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [updateIndicator])

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      setCurrentValue(nextValue)
      onValueChange?.(nextValue)
    },
    [onValueChange]
  )

  return (
    <TabsContext.Provider
      value={{
        orientation,
        indicatorRect,
        listRef,
        registerTrigger,
      }}
    >
      <TabsPrimitive.Root
        data-slot="tabs"
        data-orientation={orientation}
        orientation={orientation}
        className={cn(
          "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
          className
        )}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsContext.Provider>
  )
}

const tabsListVariants = cva(
  "relative rounded p-[3px] group-data-[orientation=horizontal]/tabs:h-9 data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const tabsContext = React.useContext(TabsContext)

  return (
    <TabsPrimitive.List
      ref={tabsContext?.listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      {tabsContext && variant === "default" && tabsContext.indicatorRect && (
        <span
          aria-hidden="true"
          data-slot="tabs-indicator"
          className={cn(
            "pointer-events-none absolute left-0 top-0 rounded-[3px] border border-input dark:border-input bg-background shadow-sm transition-[transform,width,height] duration-200 ease-out",
            tabsContext.orientation === "vertical"
              ? "h-0 w-[calc(100%-6px)]"
              : "h-0 w-0"
          )}
          style={
            tabsContext.orientation === "vertical"
              ? {
                  transform: `translate(3px, ${tabsContext.indicatorRect!.top}px)`,
                  height: tabsContext.indicatorRect.height,
                  width: "calc(100% - 6px)",
                }
              : {
                  transform: `translate(${tabsContext.indicatorRect.left}px, ${tabsContext.indicatorRect.top}px)`,
                  width: tabsContext.indicatorRect.width,
                  height: tabsContext.indicatorRect.height,
                }
          }
        />
      )}
      {props.children}
      {tabsContext && variant === "line" && tabsContext.indicatorRect && (
        <span
          aria-hidden="true"
          data-slot="tabs-indicator"
          className={cn(
            "pointer-events-none absolute rounded-full bg-foreground transition-[transform,width,height] duration-200 ease-out",
            tabsContext.orientation === "vertical"
              ? "right-0 top-0 w-0.5"
              : "left-0 bottom-0 h-0.5"
          )}
          style={
            tabsContext.orientation === "vertical"
              ? {
                  transform: `translateY(${tabsContext.indicatorRect.top}px)`,
                  height: tabsContext.indicatorRect.height,
                }
              : {
                  transform: `translateX(${tabsContext.indicatorRect.left}px)`,
                  width: tabsContext.indicatorRect.width,
                }
          }
        />
      )}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  value,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const tabsContext = React.useContext(TabsContext)
  const ref = React.useRef<HTMLButtonElement | null>(null)

  React.useEffect(() => {
    if (!tabsContext || typeof value !== "string") return
    const el = ref.current
    tabsContext.registerTrigger(value, el)
    return () => {
      tabsContext.registerTrigger(value, null)
    }
  }, [tabsContext, value])

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative z-10 inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-[3px] border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-none group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent",
        "data-[state=active]:text-foreground dark:data-[state=active]:text-foreground group-data-[variant=default]/tabs-list:data-[state=active]:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:dark:bg-transparent group-data-[variant=default]/tabs-list:data-[state=active]:dark:border-transparent",
        className
      )}
      value={value}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
