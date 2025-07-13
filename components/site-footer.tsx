import Link from "next/link"
import { Icons } from "@/components/icons"
import { siteConfig } from "@/config/site"

export function SiteFooter() {
  return (
    <footer className="py-12 md:py-16 border-t bg-background">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="flex items-center space-x-2 mb-2">
            {/* Assuming you might have a custom logo icon in Icons, otherwise remove or replace */}
            {/* <Icons.logo className="h-6 w-6" /> */}
            <span className="inline-block font-bold text-lg">{siteConfig.name}</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-4">
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {siteConfig.links.twitter && (
            <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <Icons.twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
          )}
          {siteConfig.links.github && (
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </footer>
  )
}
