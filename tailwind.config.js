/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "neo-white": "#FFFFFF",
        "primary": "#FF0000",
        "secondary": "#3B82F6"
      },
      borderWidth: {
        "neo-border": "2px"
      },
      borderRadius: {
        "neo": "4px"
      },
      boxShadow: {
        "neo-h": "2px 0px 0px 0px rgba(0,0,0,1)",
        "neo-v": "0px 2px 0px 0px rgba(0,0,0,1)",
        "neo": "2px 2px 0px 0px rgba(0,0,0,1)",
        "neo-invert": "-2px 2px 0px 0px rgba(0,0,0,1)"
      },
      fontWeight: {
        "neo-heading": "600",
        "neo-base": "400"
      }
    }
  },
  plugins: [],
}