/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#423F71',
        header: '#292841',
        body: '#1C1B29',
      },
      screens: {
        mobile: {
          max: '768px',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.font-Keepon': {
          'font-family': 'KeeponTruckin',
        },
      })
    },
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}
