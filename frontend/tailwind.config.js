/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2563EB",
          primaryHover: "#1D4ED8",
          secondary: "#F1F5F9",
          secondaryHover: "#E2E8F0"
        },
        surface: "#FFFFFF",
        page: "#F8FAFC"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"]
      }
    }
  },
  plugins: []
};
