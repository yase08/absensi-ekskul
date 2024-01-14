/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark': '#323048',
        'light':'#F5F6FA',
        'bad': '#13182B',
        'good' : '#E3E4E8',
        'Darkmode': '#323048',
        'maindark': '#252F45',
        'DarkBad': '#13182B',
        'lightmode' : '#FFFF',
        "primary": "#6777EF", //"#1565C0",
        'lightbad' : '#E3E4E8',
        'lightsun' : '#F4F6F9'
      },
      
      fontFamily:{
        'Gabarito': ['Gabarito', 'sans-serif'],
        'Nunito': ['Nunito', 'sans-serif'],
      },
      textShadow: {
        'md': '2px 2px 4px rgba(0, 0, 0, 0.5)',
      },
      boxShadow: {
        'top': '0 0 5px 5px rgba(0, 0, 0, 0.2)',
      }
      
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}

