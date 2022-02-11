module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'spring': {
          100: '#FAF1E6',
          200: '#D6EFC7',
          300: '#96BB7C',
          400: '#184D47'
        },
        'orange': '#EEBB4D'
      }
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus']
    },
  },
  plugins: [],
}
