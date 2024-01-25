// tailwind.config.js
const {nextui} = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        layout: {
          
        },
        colors: {
          background : 'white',
          foreground : '#333'
        }
      },
      dark: {
        layout: {
        },
        colors: {
          background : 'white',
          foreground : '#333'
        }
      },
  }} 
  )],
};