import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Custom colors for icy/electrifying theme
        "ice-blue": "hsl(var(--ice-blue))",
        "electric-purple": "hsl(var(--electric-purple))",
        "dark-charcoal": "hsl(var(--dark-charcoal))",
        "light-gray": "hsl(var(--light-gray))",

        // Kelvin Creekman specific theme colors
        "kelvin-primary": {
          DEFAULT: "hsl(var(--kelvin-primary))",
          foreground: "hsl(var(--kelvin-primary-foreground))",
        },
        "kelvin-secondary": {
          DEFAULT: "hsl(var(--kelvin-secondary))",
          foreground: "hsl(var(--kelvin-secondary-foreground))",
        },
        "kelvin-border": "hsl(var(--kelvin-border))",
        "kelvin-input": "hsl(var(--kelvin-input))",
        "kelvin-ring": "hsl(var(--kelvin-ring))",
        "kelvin-background": "hsl(var(--kelvin-background))",
        "kelvin-foreground": "hsl(var(--kelvin-foreground))",
        "kelvin-card": {
          DEFAULT: "hsl(var(--kelvin-card))",
          foreground: "hsl(var(--kelvin-card-foreground))",
        },
        "kelvin-popover": {
          DEFAULT: "hsl(var(--kelvin-popover))",
          foreground: "hsl(var(--kelvin-popover-foreground))",
        },
        "kelvin-muted": {
          DEFAULT: "hsl(var(--kelvin-muted))",
          foreground: "hsl(var(--kelvin-muted-foreground))",
        },
        "kelvin-accent": {
          DEFAULT: "hsl(var(--kelvin-accent))",
          foreground: "hsl(var(--kelvin-accent-foreground))",
        },
        "kelvin-destructive": {
          DEFAULT: "hsl(var(--kelvin-destructive))",
          foreground: "hsl(var(--kelvin-destructive-foreground))",
        },

        // Sidebar specific colors
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: {
            DEFAULT: "hsl(var(--sidebar-primary))",
            foreground: "hsl(var(--sidebar-primary-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--sidebar-accent))",
            foreground: "hsl(var(--sidebar-accent-foreground))",
          },
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapsible-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-out",
        "collapsible-up": "collapsible-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
