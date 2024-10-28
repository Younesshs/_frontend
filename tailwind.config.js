/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,ts,scss,css}"],
	theme: {
		extend: {
			colors: {
				bDark: "#1c88b2",
				bLight: "#d9f1f6",
			},
		},
	},
	plugins: [],
};
