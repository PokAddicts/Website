/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0e17",
          900: "#12161f",
          800: "#1c2130",
        },
        gold: {
          50: "#fdf7e7",
          100: "#faedc4",
          400: "#f0c04b",
          500: "#dda528",
          600: "#b9871a",
        },
        leaf: {
          50: "#f1faf1",
          100: "#dcf2dd",
          400: "#7dc584",
          500: "#57a960",
          600: "#3f8a49",
        },
        ember: {
          500: "#d9432b",
          600: "#b8351f",
        },
      },
      fontFamily: {
        display: ["'Montserrat'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
        brand: ["'Rethink Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
