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
            DEFAULT: '#14b8a6', // Muted architectural technical teal
            light: '#2dd4bf',   // Subtle micro-highlight
            dark: '#0f766e',    // Deep connection accent
          },
          amber: {
            DEFAULT: '#f59e0b', // Micro-highlight only
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

