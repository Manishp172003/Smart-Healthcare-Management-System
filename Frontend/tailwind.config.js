/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          dark: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#0d9488',
          dark: '#0f766e',
        },
        text: {
          primary: '#0f172a',
          secondary: '#64748b',
        },
        border: '#e2e8f0',
      },
    },
  },
  plugins: [],
}
