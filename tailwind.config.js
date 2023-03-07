/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    backdropFilter: {
      none: "none",
      blur: "blur(20px)",
    },
    extend: {
      fontFamily: {
        body: ["Quicksand, sans-serif"],
        sans: ["Roboto, sans-serif"],
      },
      keyframes: {
        wave: {
          "0%": {
            transform: "rotate(0.0deg)",
          },
          "10%": {
            transform: "rotate(14deg)",
          },
          "20%": {
            transform: "rotate(-8deg)",
          },
          "30%": {
            transform: "rotate(14deg)",
          },
          "40%": {
            transform: "rotate(-4deg)",
          },
          "50%": {
            transform: "rotate(10.0deg)",
          },
          "60%": {
            transform: "rotate(0.0deg)",
          },
          "100%": {
            transform: "rotate(0.0deg)",
          },
        },
      },
      animation: {
        "waving-hand": "wave 2s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss")],
};
