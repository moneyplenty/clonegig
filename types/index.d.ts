export type SiteConfig = {
  name: string
  description: string
  mainNav: MainNavItem[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem
