/** @type {import('tailwindcss').Config} */

// import colors from 'tailwindcss/colors';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sl-blue': '#0547c4',
      }
    },
  },
  plugins: [],
}

