import type { Config } from "tailwindcss";

const config: Config = {
  // Ensure Tailwind scans source files correctly
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0ea5e9", // action blue
          700: "#0e7490", // brand teal (trust)
          800: "#155e75",
          900: "#0c4a6e",
        },
        success: "#10B981",
        warning: "#F59E0B",
        danger:  "#F43F5E",
        ink:     "#0f172a",
      },
      boxShadow: {
        soft: "0 8px 24px rgba(2, 8, 23, 0.08)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      container: {
        center: true,
        padding: "1rem",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
export default config;
