/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT')
module.exports = withMT({
  content: [
    './src/**/*.{ts,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    'path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14b8a6',
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
        '.font-Sukhumvit': {
          'font-family': 'SukhumvitSet',
        },
      })
    },
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
})
