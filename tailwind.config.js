/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './node_modules/flowbite/**/*.js',
    './node-modules/flowbite-datepicker/**/*.js'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '2rem',
      },
    },
    extend: {
      colors:{
        'primary': '#091939',
        'secondary': '#021526'
      },
      backgroundImage:{
        'landing': 'linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url("./src/assets/images/landing.jpg")'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

