export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				popup: "popup 0.3s ease-out",
			},
		},
	},
	plugins: [import("@tailwindcss/typography")],
};
