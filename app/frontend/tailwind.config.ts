import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        dark_primary: "var(--dark-primary)",
        light_primary: "var(--light-primary)",
        secondary: "var(--secondary)",
      },
    },
  },
  plugins: [],
} satisfies Config;
