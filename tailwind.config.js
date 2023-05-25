/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        themeColor: "#fedc00"
      }
    }
  },
  plugins: [
    require("tailwindcss/plugin"),
    require("daisyui")
  ]
}
