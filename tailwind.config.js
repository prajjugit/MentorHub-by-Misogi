import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#11181C",
            primary: {
              50: "#E6F1FF",
              100: "#CCE4FF",
              200: "#99C9FF",
              300: "#66ADFF",
              400: "#3392FF",
              500: "#0077FF", // PrePlaced primary blue
              600: "#005FCC",
              700: "#004799",
              800: "#003066",
              900: "#001833",
              DEFAULT: "#0077FF",
              foreground: "#FFFFFF"
            },
            secondary: {
              50: "#FFF5E6",
              100: "#FFEACC",
              200: "#FFD699",
              300: "#FFC166",
              400: "#FFAD33",
              500: "#FF9800", // PrePlaced secondary orange
              600: "#CC7A00",
              700: "#995B00",
              800: "#663D00",
              900: "#331E00",
              DEFAULT: "#FF9800",
              foreground: "#FFFFFF"
            }
          }
        }
      }
    })
  ]
};
