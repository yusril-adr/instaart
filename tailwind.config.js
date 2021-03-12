module.exports = {
  purge: [
    './*.html',
    './scripts/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: '2rem',
        sm: '3rem',
        lg: '5rem',
        xl: '6rem',
        '2xl': '7rem',
      },
    },
    fontFamily: {
      sans: ['Segoe UI', 'Montserrat', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
