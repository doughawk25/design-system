/**
 * Examples index. Used by lib/registry and lib/llm for demo component resolution.
 * Keys are base names (e.g. "base", "radix"); values are component name -> demo info.
 */
export const ExamplesIndex: Record<
  string,
  Record<
    string,
    { filePath: string; name: string; component?: unknown }
  >
> = {
  base: {},
  radix: {},
}
