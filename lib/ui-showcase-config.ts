/**
 * All UI showcase items: sidebar nav + routes.
 * Every slug must have a corresponding page at app/ui/[slug]/page.tsx
 * or be handled by a dynamic route.
 */
export const UI_SHOWCASE_ITEMS: { path: string; label: string; description: string }[] = [
  { path: "/ui/color", label: "Color", description: "Palette ramps and semantic tokens for backgrounds, text, and UI." },
  { path: "/ui/space", label: "Space", description: "Radii and spacing tokens for layout and components." },
  { path: "/ui/icons", label: "Icon", description: "Geist icon set from Vercel, exposed as React components." },
  { path: "/ui/typography", label: "Type", description: "Typography styles for headings, body text, and UI elements." },
  { path: "/ui/styles", label: "Effects", description: "Design system effects such as shadows. For color tokens, see Color. For space and radius tokens, see Space." },
  { path: "/ui/motion", label: "Motion", description: "Animation and transition patterns. Use motion to reinforce hierarchy, provide feedback, and respect reduced motion preferences." },
  { path: "/ui/accordion", label: "Accordion", description: "Collapsible sections for revealing and hiding content." },
  { path: "/ui/alert", label: "Alert", description: "Inline messages for feedback and call-to-actions." },
  { path: "/ui/alert-dialog", label: "Alert Dialog", description: "Modal dialogs for critical confirmations." },
  { path: "/ui/aspect-ratio", label: "Aspect Ratio", description: "Maintain consistent aspect ratios for media." },
  { path: "/ui/avatar", label: "Avatar", description: "User profile images and fallback initials." },
  { path: "/ui/badge", label: "Badge", description: "Labels and status indicators." },
  { path: "/ui/breadcrumb", label: "Breadcrumb", description: "Navigation trail showing current location." },
  { path: "/ui/button", label: "Button", description: "Actions and triggers with multiple variants." },
  { path: "/ui/button-group", label: "Button Group", description: "Grouped buttons for related actions." },
  { path: "/ui/calendar", label: "Calendar", description: "Date picker calendar view." },
  { path: "/ui/card", label: "Card", description: "Container for grouped content with header and footer." },
  { path: "/ui/carousel", label: "Carousel", description: "Horizontal scrolling content slides." },
  { path: "/ui/chart", label: "Chart", description: "Data visualizations and graphs." },
  { path: "/ui/checkbox", label: "Checkbox", description: "Binary choice input control." },
  { path: "/ui/collapsible", label: "Collapsible", description: "Expandable and collapsible content regions." },
  { path: "/ui/combobox", label: "Combobox", description: "Searchable select with custom options." },
  { path: "/ui/command", label: "Command", description: "Command palette and quick actions." },
  { path: "/ui/context-menu", label: "Context Menu", description: "Right-click menu for contextual actions." },
  { path: "/ui/data-table", label: "Data Table", description: "Sortable, filterable data grid." },
  { path: "/ui/date-picker", label: "Date Picker", description: "Date selection with calendar popover." },
  { path: "/ui/dialog", label: "Dialog", description: "Modal windows for focused interactions." },
  { path: "/ui/direction", label: "Direction", description: "RTL and LTR layout support." },
  { path: "/ui/drawer", label: "Drawer", description: "Slide-out panels from screen edges." },
  { path: "/ui/dropdown-menu", label: "Dropdown Menu", description: "Menu triggered by a button." },
  { path: "/ui/empty", label: "Empty", description: "Placeholder for empty states." },
  { path: "/ui/field", label: "Field", description: "Form field wrapper with label and error." },
  { path: "/ui/hover-card", label: "Hover Card", description: "Preview content on hover." },
  { path: "/ui/input", label: "Input", description: "Text input for single-line entry." },
  { path: "/ui/input-group", label: "Input Group", description: "Input with leading or trailing add-ons." },
  { path: "/ui/input-otp", label: "Input OTP", description: "One-time code or PIN entry." },
  { path: "/ui/item", label: "Item", description: "List and nav item with link styling." },
  { path: "/ui/kbd", label: "Kbd", description: "Keyboard shortcut display." },
  { path: "/ui/label", label: "Label", description: "Form field labels." },
  { path: "/ui/menubar", label: "Menubar", description: "Horizontal menu bar for app navigation." },
  { path: "/ui/native-select", label: "Native Select", description: "Native HTML select styled for the system." },
  { path: "/ui/navigation-menu", label: "Navigation Menu", description: "Multi-level navigation with dropdowns." },
  { path: "/ui/pagination", label: "Pagination", description: "Page navigation for lists and tables." },
  { path: "/ui/popover", label: "Popover", description: "Floating content anchored to a trigger." },
  { path: "/ui/progress", label: "Progress", description: "Progress bar for completion or loading." },
  { path: "/ui/radio-group", label: "Radio Group", description: "Single choice from multiple options." },
  { path: "/ui/resizable", label: "Resizable", description: "Resizable split panels." },
  { path: "/ui/scroll-area", label: "Scroll Area", description: "Custom-styled scrollable regions." },
  { path: "/ui/select", label: "Select", description: "Dropdown select for single or multiple values." },
  { path: "/ui/separator", label: "Separator", description: "Visual divider between content." },
  { path: "/ui/sheet", label: "Sheet", description: "Slide-over panel for secondary content." },
  { path: "/ui/sidebar", label: "Sidebar", description: "Collapsible app sidebar navigation." },
  { path: "/ui/skeleton", label: "Skeleton", description: "Loading placeholder with pulse animation." },
  { path: "/ui/slider", label: "Slider", description: "Range input for numeric values." },
  { path: "/ui/sonner", label: "Sonner", description: "Toast notifications with Sonner." },
  { path: "/ui/spinner", label: "Spinner", description: "Loading indicator." },
  { path: "/ui/switch", label: "Switch", description: "Toggle for on/off states." },
  { path: "/ui/table", label: "Table", description: "Semantic table layout components." },
  { path: "/ui/tabs", label: "Tabs", description: "Tabbed content panels." },
  { path: "/ui/textarea", label: "Textarea", description: "Multi-line text input." },
  { path: "/ui/toast", label: "Toast", description: "Temporary notification messages." },
  { path: "/ui/toggle", label: "Toggle", description: "On/off toggle button." },
  { path: "/ui/toggle-group", label: "Toggle Group", description: "Group of mutually exclusive toggles." },
  { path: "/ui/tooltip", label: "Tooltip", description: "Short hint on hover or focus." },
]

/** Zero-padded page number (01, 02, 03, …) for a given UI showcase path. */
export function getUiShowcasePageNumber(path: string): string {
  const i = UI_SHOWCASE_ITEMS.findIndex((item) => item.path === path)
  if (i === -1) return ""
  return String(i + 1).padStart(2, "0")
}

export const FOUNDATIONS_LENGTH = 6

/** Zero-padded page number within section (01, 02, …) so each section starts at 01. */
export function getUiShowcaseSectionPageNumber(path: string): string {
  const i = UI_SHOWCASE_ITEMS.findIndex((item) => item.path === path)
  if (i === -1) return ""
  const indexInSection = i < FOUNDATIONS_LENGTH ? i : i - FOUNDATIONS_LENGTH
  return String(indexInSection + 1).padStart(2, "0")
}
