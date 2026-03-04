### Color token mapping

This app uses the shadcn-style semantic color tokens (CSS variables in `styles/globals.css`) as the single public API for components. Tailwind utilities like `bg-background`, `border-border`, `bg-input`, and `ring-ring` are all derived from these variables via the `@theme inline` block.

The external design tokens in `tokens.json` are mapped into this structure as follows (focusing on color):

- **Base colors**
  - `color.background` → `--background` → `bg-background`
  - `color.foreground` → `--foreground` → `text-foreground`
  - `generics.color.border` (foreground @ 10% alpha in LCH) → `--border` → `border-border`, `border-input`
  - `generics.color.ring` (foreground @ 8% alpha in LCH) → `--ring` → `ring-ring`, `outline-ring/50`
  - `generics.color.outline` (foreground @ 15% alpha in LCH) → `--outline` (internal helper, not exposed as a Tailwind color name)

- **Input-like surfaces**
  - `--input` is tied to the border token:
    - `--input: var(--border);` → `bg-input`, `border-input`

- **Brand / emphasis**
  - `components.button.brand.background` → `--brand-surface` → used via `bg-[var(--brand-surface)]`
  - `components.button.brand.foreground` / `foreground-shadow` → `--brand-foreground`, `--brand-foreground-muted`
  - `components.button.aqua.background` → `--aqua-surface`
  - `components.button.aqua.foreground` / `foreground-shadow` → `--aqua-foreground`, `--aqua-foreground-muted`
  - Neutral button variants are implemented using:
    - `--neutral-surface` / `--neutral-foreground` → `bg-neutral-surface`, `text-neutral-foreground` (consumed through component styles, not direct Tailwind color names)

- **Sidebar and surface**
  - Sidebar tokens from the design system map to:
    - `--sidebar`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, `--sidebar-ring`
    - Used via `bg-sidebar`, `text-sidebar-foreground`, `bg-sidebar-accent`, `bg-sidebar-border`, `ring-sidebar-ring`
  - Elevated/surface layers:
    - `--surface`, `--surface-foreground` → `bg-surface`, `text-surface-foreground`
    - `--raised` is used as a neutral raised surface in combination with `--neutral-*`.

#### How to change colors going forward

- Update **only** the CSS variables in `styles/globals.css` (in `:root` and `.dark`) to change the theme. All components will follow because Tailwind colors (`bg-*`, `text-*`, `border-*`, `ring-*`) are derived from these vars.
- When adding new component styles, always use existing semantic utilities (for example, `bg-background`, `bg-card`, `bg-muted`, `bg-input`, `border-border`, `ring-ring`, `text-muted-foreground`) instead of hard-coding color values.

