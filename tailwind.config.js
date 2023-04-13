/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        'sbc-blue': '#0339A6',
        'sbc-yellow': '#F2CB05'
      }
    },
  },
  plugins: [],
}

