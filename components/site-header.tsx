import Link from "next/link"
import { PlusSignIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import { getColors } from "@/lib/colors"
import { siteConfig } from "@/lib/config"
import { source } from "@/lib/source"
import { CommandMenu } from "@/components/command-menu"
import { GitHubLink } from "@/components/github-link"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeSwitcher } from "@/components/mode-switcher"
import { SiteConfig } from "@/components/site-config"
// import blocks from "@/registry/__blocks__.json"
import { Button } from "@/registry/new-york-v4/ui/button"
import { Separator } from "@/registry/new-york-v4/ui/separator"

export function SiteHeader() {
  const colors = getColors()
  const pageTree = source.pageTree

  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center **:data-[slot=separator]:!h-4">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="hidden lg:flex"
          >
            <Link href="/">
              {siteConfig.name}
            </Link>
          </Button>
          <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
          <div className="ml-auto flex flex-1 items-center justify-end gap-2">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu
                tree={pageTree}
                colors={colors}
                navItems={siteConfig.navItems}
              />
            </div>
            <Separator
              orientation="vertical"
              className="ml-2 hidden lg:block"
            />
            <GitHubLink />
            <Separator orientation="vertical" className="3xl:flex hidden" />
            <SiteConfig className="3xl:flex hidden" />
            <Separator orientation="vertical" />
            <ModeSwitcher />
            <Separator orientation="vertical" className="mr-2" />
            <Button
              asChild
              size="sm"
              className="hidden h-[31px] !rounded-[64px] sm:flex"
            >
              <Link href="/create">
                <HugeiconsIcon icon={PlusSignIcon} />
                New Project
              </Link>
            </Button>
            <Button asChild size="sm" className="h-[31px] !rounded-[64px] sm:hidden">
              <Link href="/create">
                <HugeiconsIcon icon={PlusSignIcon} />
                New
              </Link>
            </Button>
            <MobileNav
              tree={pageTree}
              items={siteConfig.navItems}
              className="ml-auto flex lg:hidden"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
