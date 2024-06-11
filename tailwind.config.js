/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        "slab": ["'Roboto Slab'", "ui-sans-serif"],
        "serif": ["Roboto Serif", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "ball": ["'M PLUS Rounded 1c'", "ui-sans-serif"],
        "board": ["'Alsina'", "ui-sans-serif"],
        "overlay": ["'Cabin'", "ui-sans-serif"], 
        "handwritten": ["'Rock Salt'", "ui-sans-serif"]
      },
      colors: {
        "almost-white": "#D9D9D9",
        "union-purple": "#310094",
        "whatsapp-green": "#42C152",
        "high-break-yellow": "#E3C93E",
        "new-break-blue": "#36FFF3",
        "unverified-grey": "#3E3E3E",
        "not-best-grey": "#94B3A0",
        "red-ball": "#B80201",
        "yellow-ball": "#FDC311",
        "green-ball": "#066557",
        "brown-ball": "#AD4C1C",
        "blue-ball": "#040FBB",
        "pink-ball": "#FC5567",
        "black-ball": "#010101",
        "pending-break": "#DCFBCD",
        "active-yellow": "#ECFF0B"
      }
    },
  },
  plugins: [],
}

