/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        "primary-light": "#EEF0FF",
        "primary-dark": "#4A43CC",
        surface: "#F8F8FC",
        card: "#FFFFFF",
        border: "#EDEDF5",
        text: {
          primary: "#1A1A2E",
          secondary: "#7B7B9A",
          muted: "#B0B0C8",
        },
        category: {
          study: "#6C63FF",
          fitness: "#FF6B6B",
          career: "#4ECDC4",
          health: "#45B7D1",
          finance: "#96CEB4",
        },
      },
      fontFamily: {
        sans: ["System"],
      },
    },
  },
  plugins: [],
};
