/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1B75BC",
        secondary: "#111111",
        accent: "#8DC63F",
      }
    },
  },
  plugins: [],
}
