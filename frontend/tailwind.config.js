/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				akira: ['"Akira Expanded"', "sans-serif"],
				krona: ["Krona One", "sans-serif"],
			},
		},
	},
	plugins: [],
};
