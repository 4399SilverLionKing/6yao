import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1f1d1a",
        parchment: "#f7f1e3",
        clay: "#c97f4f",
        moss: "#59694d",
        gold: "#d1a84d"
      }
    }
  },
  plugins: []
} satisfies Config;

