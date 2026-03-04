import { notFound } from "next/navigation"

import { ComponentShowcaseBySlug } from "@/components/ui-showcase/component-showcase-by-slug"
import { UI_SHOWCASE_ITEMS } from "@/lib/ui-showcase-config"

const SLUGS = new Set(
  UI_SHOWCASE_ITEMS.map((item) => item.path.replace("/ui/", ""))
)

export default async function UiShowcaseSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const item = UI_SHOWCASE_ITEMS.find(
    (entry) => entry.path === `/ui/${slug}`
  )
  const title =
    item?.label ??
    (slug.length ? slug.charAt(0).toUpperCase() + slug.slice(1) : "UI")

  if (!SLUGS.has(slug)) {
    notFound()
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight text-balance">
        {title}
      </h1>
      <ComponentShowcaseBySlug slug={slug} />
    </div>
  )
}
