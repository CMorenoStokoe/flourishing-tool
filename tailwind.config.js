module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        'spring': {
          100: '#f8f8ff', //FAF1E6 //FAF1E6
          200: '#FFE69A', //D6EFC7 //ABEDD8
          300: '#FFD24C', //96BB7C //5AB896
          400: '#5AB896' //184D47 //2D4059
        },
        'orange': '#B85A7C' //EEBB4D
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
