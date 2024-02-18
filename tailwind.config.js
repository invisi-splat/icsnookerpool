/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        "serif": ["Roboto Serif", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "ball": ["'M PLUS Rounded 1c'"]
      },
      colors: {
        "almost-white": "#D9D9D9",
        "union-purple": "#310094",
        "whatsapp-green": "#42C152"
      }
    },
  },
  plugins: [],
}

