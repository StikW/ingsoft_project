/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#3483fa',
          light: '#4f9fff',
          dark: '#2968c8',
        },
        secondary: {
          main: '#6b46c1',
          light: '#9f7aea',
          dark: '#553c9a',
        },
        background: {
          default: '#ebebeb',
          paper: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Proxima Nova', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
} 