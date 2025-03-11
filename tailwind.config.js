/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#CDF87F",
			},
			animation: {
				scale: "scale 1.5s ease-in-out infinite",
			},
			keyframes: {
				scale: {
					"0%, 100%": { transform: "scale(1) translateY(-50%)" },
					"50%": { transform: "scale(1.5) translateY(-50%)" },
				},
			},
		},
	},
	plugins: [],
};
