/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        benaa: {
          DEFAULT: '#0f4c3a',
          light: '#1a6b52',
          dark: '#0a3528',
        },
        majd: {
          DEFAULT: '#b8860b',
          light: '#d4a017',
          dark: '#8b6508',
        },
        accent: {
          teal: {
            DEFAULT: '#2dd4bf',
            light: '#5eead4',
            dark: '#14b8a6',
          },
          amber: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
          },
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Cairo', 'Tajawal', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'Tajawal', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

