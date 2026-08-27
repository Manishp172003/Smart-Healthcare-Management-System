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
      spacing: {
        '0.75': '0.1875rem',
        '2.75': '0.6875rem',
        '3.75': '0.9375rem',
        '4.25': '1.0625rem',
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '6.25': '1.5625rem',
        '6.75': '1.6875rem',
        '7.5': '1.875rem',
        '9.5': '2.375rem',
        '10.5': '2.625rem',
        '11.25': '2.8125rem',
        '12.5': '3.125rem',
        '13': '3.25rem',
      },
    },
  },
  plugins: [],
}
