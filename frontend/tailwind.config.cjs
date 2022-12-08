/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
      colors: {
        'bg-grey': '#DFECF1',
        'black': colors.black,
        'white': colors.white,
        'red': colors.red,
        'gray': colors.gray,
        'azzurro': '#D0E1E9',
        'blu-scuro': '#264653',
        'grey-icon': '#4D4D4D',
      },
      extend: {
        backgroundImage: {
          'waves': "url('/waves.svg')",
        },
        height: {
            'hack': 'calc(100 * var(--vh))',
        }
      },
      screens: {
        'sm': '336px',
        'md': '860px',
      },
    },
  // pplugins: [require("daisyui")],
}
