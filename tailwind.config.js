import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			fontFamily: {
        "slab": ["'Roboto Slab'", "ui-sans-serif"],
        "serif": ["Roboto Serif", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
        "ball": ["'M PLUS Rounded 1c'", "ui-sans-serif"],
        "board": ["'Alsina'", "ui-sans-serif"],
        "overlay": ["'Cabin'", "ui-sans-serif"], 
        "handwritten": ["'Rock Salt'", "ui-sans-serif"],
				sans: [...fontFamily.sans]
      },
			colors: {
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				},
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
			},
			screens: {
        'xs': '390px'
      },
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
		}
	},
};

export default config;
