import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import fluid, { extract, fontSize, screens } from "fluid-tailwind";

export default {
  darkMode: ["class"],
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  safelist: [
    "bg-golden-gradient",
    "bg-sky-gradient",
    "bg-orange-gradient",
    "bg-indigo-gradient",
  ],
  theme: {
    fluid: ({ theme }: { theme: (key: string) => string }) => ({
      defaultScreens: [theme("screens.lg"), theme("screens.2xl")],
    }),
    screens,
    fontSize,
    extend: {
      colors: {
        background: {
          DEFAULT: "hsl(var(--background))",
          secondary: "hsl(var(--secondary-background))",
        },
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        archivo: "var(--font-archivo)",
        "archivo-black": "var(--font-archivo-black)",
      },
      backgroundImage: {
        "golden-gradient":
          "linear-gradient(137.09deg, #D0CB13 3.39%, #DCD72A 23.68%, #F0ED61 36.24%, #DDD82A 47.83%, #D0CB13 100%)",
        "sky-gradient":
          "linear-gradient(137.09deg, #72B3C6 3.39%, #8AC7D9 23.68%, #A5DBEB 36.24%, #8AC7D9 47.83%, #72B3C6 100%)",
        "orange-gradient":
          "linear-gradient(137.09deg, #DD5217 3.39%, #E96730 23.68%, #F17E4D 36.24%, #E96730 47.83%, #DD5217 100%)",
        "indigo-gradient":
          "linear-gradient(137.09deg, #004E60 3.39%, #136E82 23.68%, #388192 36.24%, #136E82 47.83%, #004E60 100%)",
      },
    },
  },
  plugins: [tailwindcssAnimate, fluid],
} satisfies Config;
