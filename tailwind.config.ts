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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Fire theme colors (light mode)
        fire: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
          950: "#431407",
        },
        ember: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
          950: "#422006",
        },
        smoke: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Ice theme colors (dark mode)
        electric: {
          50: "#f2fcff",
          100: "#c9f5ff",
          200: "#a0edff",
          300: "#64d8ff",
          400: "#1ebcff",
          500: "#06a6f1",
          600: "#0088d2",
          700: "#006daa",
          800: "#00598a",
          900: "#004870",
          950: "#002e4a",
        },
        frost: {
          50: "#f0f7ff",
          100: "#dff0ff",
          200: "#bae2ff",
          300: "#7ccbff",
          400: "#36acff",
          500: "#0990ff",
          600: "#0072ff",
          700: "#005aca",
          800: "#004c9e",
          900: "#054182",
          950: "#042a56",
        },
        metal: {
          50: "#f6f6f9",
          100: "#ededf3",
          200: "#d6d6e3",
          300: "#b5b4ca",
          400: "#908eae",
          500: "#757293",
          600: "#5e5b78",
          700: "#4c4961",
          800: "#413f52",
          900: "#383646",
          950: "#252330",
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
          "0%, 100%": {
            boxShadow: "0 0 5px 2px rgba(37, 171, 255, 0.7), 0 0 20px 5px rgba(37, 99, 235, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 15px 5px rgba(37, 171, 255, 0.8), 0 0 30px 10px rgba(37, 99, 235, 0.6)",
          },
        },
        "fire-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px 2px rgba(255, 100, 0, 0.7), 0 0 20px 5px rgba(255, 60, 0, 0.5)",
          },
          "50%": {
            boxShadow: "0 0 15px 5px rgba(255, 100, 0, 0.8), 0 0 30px 10px rgba(255, 60, 0, 0.6)",
          },
        },
        "frost-shimmer": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "ember-shimmer": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
        "lightning-flash": {
          "0%, 100%": { opacity: "0" },
          "10%, 30%, 50%, 70%, 90%": { opacity: "0" },
          "5%, 25%, 45%, 65%, 85%": { opacity: "0.8" },
        },
        "flame-flicker": {
          "0%, 100%": { opacity: "0" },
          "10%, 30%, 50%, 70%, 90%": { opacity: "0" },
          "5%, 25%, 45%, 65%, 85%": { opacity: "0.8" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "electric-pulse": "electric-pulse 2s infinite",
        "fire-pulse": "fire-pulse 2s infinite",
        "frost-shimmer": "frost-shimmer 3s ease infinite",
        "ember-shimmer": "ember-shimmer 3s ease infinite",
        "lightning-flash": "lightning-flash 5s infinite",
        "flame-flicker": "flame-flicker 5s infinite",
      },
      backgroundImage: {
        "gradient-frost": "linear-gradient(45deg, #06a6f1, #0072ff, #00598a, #0990ff)",
        "gradient-electric": "linear-gradient(135deg, #1ebcff, #0088d2, #006daa, #64d8ff)",
        "gradient-fire": "linear-gradient(45deg, #f97316, #ea580c, #c2410c, #fb923c)",
        "gradient-ember": "linear-gradient(135deg, #facc15, #eab308, #ca8a04, #fde047)",
        "gradient-metal": "linear-gradient(to right, #252330, #383646, #4c4961, #383646, #252330)",
        "gradient-smoke": "linear-gradient(to right, #64748b, #475569, #334155, #475569, #64748b)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
