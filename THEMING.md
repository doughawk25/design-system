### Color token mapping

This app uses Tailwind default colors only. Semantic tokens in `styles/globals.css` (e.g. `--background`, `--foreground`, `--primary`) map directly to Tailwind palette variables (`--color-zinc-50`, `--color-zinc-950`, `--color-zinc-900`, etc.). Utilities like `bg-background`, `border-border`, and `ring-ring` are derived via the `@theme inline` block.

- **Base colors** → Tailwind defaults (white, zinc)
  - `--background`, `--foreground` → `bg-background`, `text-foreground`
  - `--border`, `--input`, `--ring` → `border-border`, `bg-input`, `ring-ring`

- **Semantic** → Tailwind defaults (zinc, red, blue)
  - `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive` and their `-foreground` pairs
  - Charts use `--chart-1` … `--chart-5` (blue ramp)

- **Sidebar and surfaces** → Tailwind zinc ramp
  - `--sidebar`, `--surface`, `--code`, `--selection`, `--raised` and related tokens

#### How to change colors

- Edit only the CSS variables in `styles/globals.css` (`:root` and `.dark`). Use Tailwind color variables: `var(--color-zinc-500)`, `var(--color-blue-600)`, etc.
- Use semantic utilities (`bg-background`, `bg-card`, `bg-muted`, `border-border`, `text-muted-foreground`) or Tailwind ramp utilities (`bg-zinc-100`, `text-blue-600`) in components.

