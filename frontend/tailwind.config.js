// See https://tailwindcss.com/docs/configuration for details
module.exports = {
    future: {
      removeDeprecatedGapUtilities: true,
      purgeLayersByDefault: true,
    },
    experimental: {
      applyComplexClasses: true,
    },
    // purge: {
    //   enabled: true,
    //   content: ['./src/**/*.js'],
    // },
    theme: {
      container: {
        center: true,
      },
      extend: {
        maxHeight: {
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
        },
        minHeight: {
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
        },
        minWidth: {
          xs: "20rem",
          sm: "24rem",
          md: "28rem",
          lg: "32rem",
          xl: "36rem",
          "2xl": "42rem",
          "3xl": "48rem",
          "4xl": "56rem",
          "5xl": "64rem",
          "6xl": "72rem",
        },
      },
    },
    variants: {},
    // https://github.com/tailwindcss/custom-forms
    plugins: [
      require('@tailwindcss/custom-forms')
    ]
  };