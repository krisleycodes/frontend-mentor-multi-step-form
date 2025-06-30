/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary colors
        blue: {
          50: 'hsl(231, 100%, 99%)',
          100: 'hsl(218, 100%, 97%)',
          200: 'hsl(206, 94%, 87%)',
          300: 'hsl(228, 100%, 84%)',
          950: 'hsl(213, 96%, 18%)',
        },
        purple: {
          200: 'hsl(229, 24%, 87%)',
          600: 'hsl(243, 100%, 62%)',
        },
        red: {
          500: 'hsl(354, 84%, 57%)',
        },
        // Neutral colors
        grey: {
          500: 'hsl(231, 11%, 63%)',
        },
        white: 'hsl(0, 100%, 100%)',
      },
    },
  },
  plugins: [],
}

