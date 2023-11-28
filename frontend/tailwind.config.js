/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      colors: {
        'blue-dark': '#214F6D',
        'blue-exdark': '#1A3E55',        
        'blue': '#3B88C3',
        'blue-light': '#6FC2DD',
        'yellow': '#F5C14A',
        'yellow-dark': '#FFAE36',
        'red': '#E65345',
        'red-dark': '#D54D40',
        'gray': '#D9D9D9',
      },
    },
    fontFamily: {
      lexend: ['Lexend', 'sans-serif'],
    },
    boxShadow: {
      inner: 'inset -1px -1px 5px 1px #3B88C3',
    }
  },
  plugins: [],
}