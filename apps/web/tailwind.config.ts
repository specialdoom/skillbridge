import kampsyUI from "@skillbridge/kampsy-ui/preset";

/** @type {import('tailwindcss').Config} */
export default {
	content: kampsyUI.content,
	presets: [kampsyUI],
	theme: {
		extend: {}
	},
	plugins: []
};
