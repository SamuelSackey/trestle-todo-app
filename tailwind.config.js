/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(220, 98%, 61%)",
        "lighter-grey": "hsl(0, 0%, 98%)",
        "lighter-greyish-blue": "hsl(236, 33%, 92%)",
        "light-greyish-blue": "hsl(233, 11%, 84%)",
        "dark-greyish-blue": "hsl(236, 9%, 61%)",
        "darker-greyish-blue": "hsl(235, 19%, 35%)",
        "dark-blue-dark": "hsl(235, 21%, 11%)",
        "darker-desaturated-blue-dark": "hsl(235, 24%, 19%)",
        "light-greyish-blue-dark": "hsl(234, 39%, 85%)",
        "light-greyish-blue-hover-dark": "hsl(236, 33%, 92%)",
        "dark-greyish-blue-dark": "hsl(234, 11%, 52%)",
        "darker-greyish-blue-dark": "hsl(233, 14%, 35%)",
        "darkest-greyish-blue-dark": "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
