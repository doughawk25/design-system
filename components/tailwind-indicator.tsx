const SHOW = false

export function TailwindIndicator({
  forceMount: _forceMount = false,
}: {
  forceMount?: boolean
}) {
  if (process.env.NODE_ENV === "production" || !SHOW) {
    return null
  }

  return null
}
