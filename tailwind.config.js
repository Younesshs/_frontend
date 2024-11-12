/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts,scss,css}",
		"./node_modules/flowbite/**/*.js",
	],
	theme: {
		extend: {
			colors: {
				bDark: "#AAD3DF",
				bLight: "#d9f1f6",
				darkk: "#111827",
			},
		},
	},
	plugins: [require("flowbite/plugin")],
};
