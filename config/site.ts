export const siteConfig = {
  name: "SaaS Starter",
  description: "A Next.js SaaS starter kit with Supabase and Stripe.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Store",
      href: "/store",
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
      title: "Content",
      href: "/content",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Join",
      href: "/join",
    },
  ],
  links: {
    twitter: "https://twitter.com/vercel",
    github: "https://github.com/vercel/next.js",
    docs: "https://nextjs.org/docs",
  },
}

export type SiteConfig = typeof siteConfig
