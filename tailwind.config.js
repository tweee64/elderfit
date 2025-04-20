/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxl': '1.75rem',
        'xxxl': '2rem',
      },
      colors: {
        'primary': '#4F46E5',
        'primary-dark': '#3730A3',
        'elderly-teal': '#38B2AC',
        'elderly-orange': '#F59E0B',
        'elderly-blue': '#3B82F6',
      },
      spacing: {
        '18': '4.5rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}