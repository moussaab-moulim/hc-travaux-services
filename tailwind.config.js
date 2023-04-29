const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./slices/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      raleway: ["var(--font-raleway)", ...fontFamily.sans],
    },
    extend: {
      transitionTimingFunction: {
        ease: "ease",
      },
      colors: {
        white: "#FFFFFF",
        black: "#000",
        light: "#F6F6F6",
        gray: "#E3E3E3",
        dark: "#313131",
        darkgray: "#96989B",
        accent: "#DA2128",
        text: "#6e6e6e",
        secondary: "#795445",
        //primary: "#ba9785",
        primary: "#c4a494",
        //primary: "#d7b9aa",
      },
      boxShadow: {
        allAround: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
      },
    },
  },
  plugins: [require("tailwindcss-hyphens")],
};
