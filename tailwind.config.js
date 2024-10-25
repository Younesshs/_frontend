/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts,scss,css}"],
	theme: {
		extend: {
			colors: {
				bDark: "#2a5d63",
				bLight: "#d9f1f6",
			},
		},
	},
	plugins: [],
};
