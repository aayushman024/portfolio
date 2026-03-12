/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        base: '#09090b', // zinc-950
        surface: '#18181b', // zinc-900
        primary: '#06b6d4', // cyan-500
        accent: '#6366f1', // indigo-500
      }
    },
  },
  plugins: [],
}