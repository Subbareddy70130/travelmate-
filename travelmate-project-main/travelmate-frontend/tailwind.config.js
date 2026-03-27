/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#34d399", // Emerald
        secondary: "#0f172a", // Slate
      }
    },
  },
  plugins: [],
}
