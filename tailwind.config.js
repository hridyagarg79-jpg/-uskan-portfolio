/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#F4F4F4',
        'deep-black': '#0A0A0A',
        'marigold': '#FDB813',
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Archive Black"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
}
