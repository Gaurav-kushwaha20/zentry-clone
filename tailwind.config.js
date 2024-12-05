import colora from "tailwindcss/colors.js";
const defaultColors = require('tailwindcss/colors');
const defaultFont = require('tailwindcss/')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zentry: ['zentry', 'sans-serif'],
        general: ['general', 'sans-serif'],
        'circular-web': ['circular-web', 'sans-serif'],
        'robert-medium': ['robert-medium', 'sans-serif'],
        'robert-regular': ['robert-regular', 'sans-serif'],
      }
    },
    colors: {
      ...defaultColors,
      blue: {
        50: '#DFDFF0',
        75: '#DFDFF2',
        100: '#F0F2FA',
        200: '#01010',
        300: '#4FB7DD',
      },
      violet: {
        300: '#5724ff',
      }
    }
  },
  plugins: [],
}