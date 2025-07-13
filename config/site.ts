export const siteConfig = {
  name: "Kelvin Creekman Fan Club",
  description: "Official fan club website for rock and metal musician Kelvin Creekman",
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
      title: "Store",
      href: "/store",
    },
    {
      title: "Community",
      href: "/community",
    },
    {
      title: "Meet & Greet",
      href: "/meet-and-greet",
    },
  ],
  links: {
    twitter: "https://twitter.com/kelvincreekman",
    instagram: "https://instagram.com/kelvincreekman",
    youtube: "https://youtube.com/kelvincreekman",
    tiktok: "https://tiktok.com/@kelvincreekman",
  },
}

export type SiteConfig = typeof siteConfig
