/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          'SF Pro Display', 
          'SF Pro Text', 
          'system-ui', 
          'Helvetica Neue', 
          'Helvetica',
          'sans-serif'
        ],
        heading: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          'SF Pro Display', 
          'SF Pro Text', 
          'system-ui', 
          'Helvetica Neue', 
          'Helvetica',
          'sans-serif'
        ],
      },
      fontSize: {
        'xxl': '1.75rem',
        'xxxl': '2rem',
      },
      colors: {
        'primary': '#E47C53', // Orange from the design
        'primary-light': '#F9E9E2', // Light orange/peach background
        'primary-dark': '#D35F34', // Darker orange for hover states
        'neutral-bg': '#FAF3EF', // Light neutral background
        'neutral-text': '#2A2A2A', // Dark text color
        'card-bg': '#FFFFFF', // White card background
        'accent-green': '#4D9082', // Green accent color
        'accent-blue': '#7296B6', // Blue accent color
        'accent-bronze': '#CBA78C', // Bronze accent color
        'healthy-green': '#4BC467', // Healthy365 green
        'healthy-yellow': '#FCC646', // Healthy365 yellow
      },
      spacing: {
        '18': '4.5rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'card': '0 4px 15px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}