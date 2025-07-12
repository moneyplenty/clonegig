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
          default: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          default: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          default: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          default: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          default: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          default: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          default: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        electric: {
          50: "hsl(var(--electric-50))",
          100: "hsl(var(--electric-100))",
          200: "hsl(var(--electric-200))",
          300: "hsl(var(--electric-300))",
          400: "hsl(var(--electric-400))",
          500: "hsl(var(--electric-500))",
          600: "hsl(var(--electric-600))",
          700: "hsl(var(--electric-700))",
          800: "hsl(var(--electric-800))",
          900: "hsl(var(--electric-900))",
          950: "hsl(var(--electric-950))",
        },
        frost: {
          50: "hsl(var(--frost-50))",
          100: "hsl(var(--frost-100))",
          200: "hsl(var(--frost-200))",
          300: "hsl(var(--frost-300))",
          400: "hsl(var(--frost-400))",
          500: "hsl(var(--frost-500))",
          600: "hsl(var(--frost-600))",
          700: "hsl(var(--frost-700))",
          800: "hsl(var(--frost-800))",
          900: "hsl(var(--frost-900))",
          950: "hsl(var(--frost-950))",
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
        "electric-pulse": {
          "0%": { boxShadow: "0 0 0px 0px rgba(var(--electric-500-rgb), 0.7)" },
          "70%": { boxShadow: "0 0 0px 10px rgba(var(--electric-500-rgb), 0)" },
          "100%": { boxShadow: "0 0 0px 0px rgba(var(--electric-500-rgb), 0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "electric-pulse": "electric-pulse 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
