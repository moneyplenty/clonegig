export const siteConfig = {
  name: "Kelvin Creekman Fan Club",
  description: "Official fan club website for Kelvin Creekman",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Content",
      href: "/content",
    },
    {
      title: "Events",
      href: "/events",
    },
    {
      title: "Meet & Greet",
      href: "/meet-and-greet",
    },
    {
      title: "Store",
      href: "/store",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Dashboard",
      href: "/dashboard",
    },
  ],
  links: {
    twitter: "https://twitter.com/vercel",
    github: "https://github.com/vercel/next.js",
    docs: "https://nextjs.org",
  },
}

export type SiteConfig = typeof siteConfig
