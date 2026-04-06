/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3b82f6",
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
        },
        secondary: {
          light: "#10b981",
          DEFAULT: "#059669",
          dark: "#047857",
        },
        surface: {
          light: "#ffffff",
          DEFAULT: "#f8fafc",
          dark: "#0f172a",
        },
        accent: "#009b4d", // Keeping Dredd's signature green
      },
      fontFamily: {
        anta: ["Anta", "sans-serif"],
        squids: ["Squids", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
