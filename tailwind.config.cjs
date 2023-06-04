/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				border: 'rgb(239, 243, 244)',
				'media-border': 'rgb(207, 217, 222)',
				'header-background': 'rgba(239, 243, 244, 0.85)',
				link: 'rgb(29,155,240)',
			},
			fontFamily: {
				sans: ['Twemoji Country Flags', 'Segoe UI', 'Meiryo', ...defaultTheme.fontFamily.sans],
			},
			screens: {
				xs: '410px',
				'2xl': '1536px',
			},
			variants: {
				float: ['responsive', 'direction'],
				margin: ['responsive', 'direction'],
				padding: ['responsive', 'direction'],
			},
		},
	},
	plugins: [require('tailwindcss-dir')()],
}
