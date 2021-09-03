module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#EEFFFF',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#EEFFFF',
              },
            },
            h1: {
              color: '#EEFFFF',
            },
            h2: {
              color: '#EEFFFF',
            },
            h3: {
              color: '#EEFFFF',
            },
            h4: {
              color: '#EEFFFF',
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {

    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
