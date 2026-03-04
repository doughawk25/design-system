"use client"

import * as React from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DirectionProvider } from "@/components/ui/direction"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { PreviewCard } from "@/components/ui-showcase/preview-card"

export function ComponentShowcaseBySlug({ slug }: { slug: string }) {
  const content = React.useMemo(() => {
    switch (slug) {
      case "accordion":
        return (
          <PreviewCard className="w-full">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="1">
                <AccordionTrigger>Item 1</AccordionTrigger>
                <AccordionContent>Content 1.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="2">
                <AccordionTrigger>Item 2</AccordionTrigger>
                <AccordionContent>Content 2.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </PreviewCard>
        )
      case "alert":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <PreviewCard label="Default">
              <Alert className="max-w-md">
                <AlertTitle>Title</AlertTitle>
                <AlertDescription>Description.</AlertDescription>
              </Alert>
            </PreviewCard>
            <PreviewCard label="Destructive">
              <Alert variant="destructive" className="max-w-md">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Something went wrong.</AlertDescription>
              </Alert>
            </PreviewCard>
          </div>
        )
      case "alert-dialog":
        return (
          <PreviewCard label="Trigger to open">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>Open</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Title</AlertDialogTitle>
                  <AlertDialogDescription>Description.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </PreviewCard>
        )
      case "aspect-ratio":
        return (
          <PreviewCard label="16/9" className="max-w-md">
            <AspectRatio ratio={16 / 9} className="rounded-md bg-muted">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                Placeholder
              </div>
            </AspectRatio>
          </PreviewCard>
        )
      case "avatar":
        return (
          <PreviewCard label="Avatar">
            <Avatar>
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </PreviewCard>
        )
      case "badge":
        return (
          <PreviewCard label="Badge">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </PreviewCard>
        )
      case "breadcrumb":
        return (
          <PreviewCard>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </PreviewCard>
        )
      case "button":
        return (
          <div className="grid gap-4 sm:grid-cols-2">
            <PreviewCard label="Variants">
              <Button>Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
            </PreviewCard>
            <PreviewCard label="Sizes">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </PreviewCard>
          </div>
        )
      case "button-group":
        return (
          <PreviewCard label="Button Group">
            <ButtonGroup>
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </PreviewCard>
        )
      case "calendar":
        return (
          <PreviewCard>
            <Calendar mode="single" />
          </PreviewCard>
        )
      case "card":
        return (
          <PreviewCard className="max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card description.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Content goes here.</p>
              </CardContent>
              <CardFooter>
                <Button>Action</Button>
              </CardFooter>
            </Card>
          </PreviewCard>
        )
      case "carousel":
        return (
          <PreviewCard className="max-w-xs">
            <Carousel>
              <CarouselContent>
                <CarouselItem>Slide 1</CarouselItem>
                <CarouselItem>Slide 2</CarouselItem>
                <CarouselItem>Slide 3</CarouselItem>
              </CarouselContent>
            </Carousel>
          </PreviewCard>
        )
      case "chart":
        return (
          <PreviewCard label="Chart" className="h-[200px] w-full">
            <div className="flex h-full w-full items-center justify-center rounded border bg-muted text-muted-foreground text-sm">
              Chart (use ChartContainer + recharts)
            </div>
          </PreviewCard>
        )
      case "checkbox":
        return (
          <PreviewCard label="Checkbox">
            <div className="flex items-center gap-2">
              <Checkbox id="c1" />
              <Label htmlFor="c1">Accept terms</Label>
            </div>
          </PreviewCard>
        )
      case "collapsible":
        return (
          <PreviewCard>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="outline">Toggle</Button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <p className="pt-2 text-sm">Collapsible content.</p>
              </CollapsibleContent>
            </Collapsible>
          </PreviewCard>
        )
      case "combobox":
        return (
          <PreviewCard label="Combobox" className="min-w-[200px]">
            <Command>
              <CommandInput placeholder="Search..." />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup>
                  <CommandItem>Item 1</CommandItem>
                  <CommandItem>Item 2</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PreviewCard>
        )
      case "command":
        return (
          <PreviewCard label="Command" className="min-w-[200px]">
            <Command>
              <CommandInput placeholder="Type a command..." />
              <CommandList>
                <CommandEmpty>No results.</CommandEmpty>
                <CommandGroup>
                  <CommandItem>Item 1</CommandItem>
                  <CommandItem>Item 2</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PreviewCard>
        )
      case "context-menu":
        return (
          <PreviewCard label="Right-click">
            <ContextMenu>
              <ContextMenuTrigger asChild>
                <Button variant="outline">Right click</Button>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Copy</ContextMenuItem>
                <ContextMenuItem>Paste</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </PreviewCard>
        )
      case "data-table":
        return (
          <PreviewCard label="Data Table (Table + patterns)" className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Row 1</TableCell>
                  <TableCell>100</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Row 2</TableCell>
                  <TableCell>200</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PreviewCard>
        )
      case "date-picker":
        return (
          <PreviewCard label="Date Picker (Calendar + Popover)">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Pick a date</Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar mode="single" />
              </PopoverContent>
            </Popover>
          </PreviewCard>
        )
      case "dialog":
        return (
          <PreviewCard label="Trigger to open">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Title</DialogTitle>
                  <DialogDescription>Description.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </PreviewCard>
        )
      case "direction":
        return (
          <PreviewCard label="Direction (RTL/LTR provider)">
            <DirectionProvider dir="ltr">
              <p className="text-sm">Content in LTR direction.</p>
            </DirectionProvider>
          </PreviewCard>
        )
      case "drawer":
        return (
          <PreviewCard label="Trigger to open">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline">Open drawer</Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Title</DrawerTitle>
                  <DrawerDescription>Description.</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Submit</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </PreviewCard>
        )
      case "dropdown-menu":
        return (
          <PreviewCard label="Trigger to open">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Open menu</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Item 1</DropdownMenuItem>
                <DropdownMenuItem>Item 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </PreviewCard>
        )
      case "empty":
        return (
          <PreviewCard>
            <Empty>
              <EmptyTitle>No items</EmptyTitle>
              <EmptyDescription>Add items to get started.</EmptyDescription>
            </Empty>
          </PreviewCard>
        )
      case "field":
        return (
          <PreviewCard className="max-w-sm">
            <FieldGroup>
              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input type="email" placeholder="Email" />
                <FieldDescription>We will never share your email.</FieldDescription>
              </Field>
            </FieldGroup>
          </PreviewCard>
        )
      case "hover-card":
        return (
          <PreviewCard>
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">Hover me</Button>
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">Hover card content.</p>
              </HoverCardContent>
            </HoverCard>
          </PreviewCard>
        )
      case "input":
        return (
          <PreviewCard label="Input">
            <Input placeholder="Placeholder" className="w-64" />
            <Input disabled placeholder="Disabled" className="w-64" />
          </PreviewCard>
        )
      case "input-group":
        return (
          <PreviewCard label="Input Group">
            <InputGroup>
              <InputGroupAddon>$</InputGroupAddon>
              <InputGroupInput placeholder="0.00" />
            </InputGroup>
          </PreviewCard>
        )
      case "input-otp":
        return (
          <PreviewCard label="Input OTP">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </PreviewCard>
        )
      case "item":
        return (
          <PreviewCard label="Item">
            <Item>
              <ItemContent>
                <ItemTitle>Item label</ItemTitle>
              </ItemContent>
            </Item>
          </PreviewCard>
        )
      case "kbd":
        return (
          <PreviewCard label="Kbd">
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </PreviewCard>
        )
      case "label":
        return (
          <PreviewCard label="Label">
            <Label htmlFor="label-demo">Label text</Label>
            <Input id="label-demo" placeholder="With label" className="w-48 mt-1" />
          </PreviewCard>
        )
      case "menubar":
        return (
          <PreviewCard>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>New</MenubarItem>
                  <MenubarItem>Open</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </PreviewCard>
        )
      case "native-select":
        return (
          <PreviewCard label="Native Select">
            <NativeSelect>
              <NativeSelectOption value="">Select...</NativeSelectOption>
              <NativeSelectOption value="1">Option 1</NativeSelectOption>
              <NativeSelectOption value="2">Option 2</NativeSelectOption>
            </NativeSelect>
          </PreviewCard>
        )
      case "navigation-menu":
        return (
          <PreviewCard>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Item 1</NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="#">Item 2</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </PreviewCard>
        )
      case "pagination":
        return (
          <PreviewCard>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </PreviewCard>
        )
      case "popover":
        return (
          <PreviewCard>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Open popover</Button>
              </PopoverTrigger>
              <PopoverContent>
                <p className="text-sm">Popover content.</p>
              </PopoverContent>
            </Popover>
          </PreviewCard>
        )
      case "progress":
        return (
          <PreviewCard label="Progress">
            <Progress value={60} className="w-48" />
          </PreviewCard>
        )
      case "radio-group":
        return (
          <PreviewCard label="Radio Group">
            <RadioGroup defaultValue="one">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="one" id="r1" />
                <Label htmlFor="r1">One</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="two" id="r2" />
                <Label htmlFor="r2">Two</Label>
              </div>
            </RadioGroup>
          </PreviewCard>
        )
      case "resizable":
        return (
          <PreviewCard label="Resizable" className="h-32 w-full">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={50}>
                <div className="flex flex-1 items-center justify-center rounded border bg-muted p-2 text-sm">A</div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={50}>
                <div className="flex flex-1 items-center justify-center rounded border bg-muted p-2 text-sm">B</div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </PreviewCard>
        )
      case "scroll-area":
        return (
          <PreviewCard label="Scroll Area" className="h-24 w-48">
            <ScrollArea className="h-full w-full rounded border p-2">
              <p className="text-sm">Scrollable content. Lorem ipsum dolor sit amet.</p>
            </ScrollArea>
          </PreviewCard>
        )
      case "select":
        return (
          <PreviewCard label="Select">
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">One</SelectItem>
                <SelectItem value="2">Two</SelectItem>
              </SelectContent>
            </Select>
          </PreviewCard>
        )
      case "separator":
        return (
          <PreviewCard label="Separator">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Above</p>
              <Separator />
              <p className="text-sm">Below</p>
            </div>
          </PreviewCard>
        )
      case "sheet":
        return (
          <PreviewCard label="Trigger to open">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Title</SheetTitle>
                  <SheetDescription>Description.</SheetDescription>
                </SheetHeader>
                <p className="py-4 text-sm">Sheet content.</p>
              </SheetContent>
            </Sheet>
          </PreviewCard>
        )
      case "sidebar":
        return (
          <PreviewCard label="Sidebar (provider + components)">
            <SidebarProvider>
              <p className="text-sm">Sidebar provider wraps the app.</p>
            </SidebarProvider>
          </PreviewCard>
        )
      case "skeleton":
        return (
          <PreviewCard label="Skeleton">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </PreviewCard>
        )
      case "slider":
        return (
          <PreviewCard label="Slider">
            <Slider defaultValue={[50]} max={100} className="w-48" />
          </PreviewCard>
        )
      case "sonner":
        return (
          <PreviewCard label="Sonner (Toast)">
            <Toaster />
            <Button
              onClick={() => {
                toast.success("Toast from Sonner")
              }}
            >
              Show toast
            </Button>
          </PreviewCard>
        )
      case "spinner":
        return (
          <PreviewCard label="Spinner">
            <Spinner />
          </PreviewCard>
        )
      case "switch":
        return (
          <PreviewCard label="Switch">
            <div className="flex items-center gap-2">
              <Switch id="sw1" />
              <Label htmlFor="sw1">Toggle</Label>
            </div>
          </PreviewCard>
        )
      case "table":
        return (
          <PreviewCard className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>A</TableCell>
                  <TableCell>1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>B</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </PreviewCard>
        )
      case "tabs":
        return (
          <PreviewCard className="w-full">
            <Tabs defaultValue="one">
              <TabsList>
                <TabsTrigger value="one">One</TabsTrigger>
                <TabsTrigger value="two">Two</TabsTrigger>
              </TabsList>
              <TabsContent value="one">Content one</TabsContent>
              <TabsContent value="two">Content two</TabsContent>
            </Tabs>
          </PreviewCard>
        )
      case "textarea":
        return (
          <PreviewCard label="Textarea">
            <Textarea placeholder="Placeholder" className="w-64 min-h-20" />
          </PreviewCard>
        )
      case "toast":
        return (
          <PreviewCard label="Toast (Sonner)">
            <p className="text-sm text-muted-foreground">Use Sonner component for toasts.</p>
            <Button
              onClick={() => {
                toast("Toast message")
              }}
            >
              Show toast
            </Button>
          </PreviewCard>
        )
      case "toggle":
        return (
          <PreviewCard label="Toggle">
            <Toggle>Toggle</Toggle>
            <Toggle variant="outline">Outline</Toggle>
          </PreviewCard>
        )
      case "toggle-group":
        return (
          <PreviewCard label="Toggle Group">
            <ToggleGroup type="single">
              <ToggleGroupItem value="a">A</ToggleGroupItem>
              <ToggleGroupItem value="b">B</ToggleGroupItem>
              <ToggleGroupItem value="c">C</ToggleGroupItem>
            </ToggleGroup>
          </PreviewCard>
        )
      case "tooltip":
        return (
          <PreviewCard label="Tooltip">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tooltip content</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </PreviewCard>
        )
      default:
        return (
          <PreviewCard>
            <p className="text-muted-foreground text-sm">
              Preview for &quot;{slug}&quot;.
            </p>
          </PreviewCard>
        )
    }
  }, [slug])

  return <div className="flex w-full flex-col gap-6">{content}</div>
}
