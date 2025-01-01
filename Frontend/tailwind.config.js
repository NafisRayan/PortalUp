/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0f172a', // Dark blue
        'secondary': '#1d4ed8', // Slightly lighter blue
        'accent': '#14b8a6', // Teal
        'light-gray': '#f1f5f9',
        'dark-gray': '#6b7280',
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'sans': ['ui-sans-serif', 'system-ui', ...defaultTheme.fontFamily.sans],
        'serif': ['ui-serif', 'Georgia', ...defaultTheme.fontFamily.serif],
        'mono': ['ui-monospace', 'SFMono-Regular', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
}
