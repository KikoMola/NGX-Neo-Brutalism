/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts}"],
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
  safelist: [
    // Red
    'bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900',
    'text-red-50', 'text-red-100', 'text-red-200', 'text-red-300', 'text-red-400', 'text-red-500', 'text-red-600', 'text-red-700', 'text-red-800', 'text-red-900',
    'border-red-50', 'border-red-100', 'border-red-200', 'border-red-300', 'border-red-400', 'border-red-500', 'border-red-600', 'border-red-700', 'border-red-800', 'border-red-900',
    'hover:bg-red-50', 'hover:bg-red-100', 'hover:bg-red-200', 'hover:bg-red-300', 'hover:bg-red-400', 'hover:bg-red-500', 'hover:bg-red-600', 'hover:bg-red-700', 'hover:bg-red-800', 'hover:bg-red-900',
    'hover:text-red-50', 'hover:text-red-100', 'hover:text-red-200', 'hover:text-red-300', 'hover:text-red-400', 'hover:text-red-500', 'hover:text-red-600', 'hover:text-red-700', 'hover:text-red-800', 'hover:text-red-900',
    
    // Blue
    'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',
    'text-blue-50', 'text-blue-100', 'text-blue-200', 'text-blue-300', 'text-blue-400', 'text-blue-500', 'text-blue-600', 'text-blue-700', 'text-blue-800', 'text-blue-900',
    'border-blue-50', 'border-blue-100', 'border-blue-200', 'border-blue-300', 'border-blue-400', 'border-blue-500', 'border-blue-600', 'border-blue-700', 'border-blue-800', 'border-blue-900',
    'hover:bg-blue-50', 'hover:bg-blue-100', 'hover:bg-blue-200', 'hover:bg-blue-300', 'hover:bg-blue-400', 'hover:bg-blue-500', 'hover:bg-blue-600', 'hover:bg-blue-700', 'hover:bg-blue-800', 'hover:bg-blue-900',
    'hover:text-blue-50', 'hover:text-blue-100', 'hover:text-blue-200', 'hover:text-blue-300', 'hover:text-blue-400', 'hover:text-blue-500', 'hover:text-blue-600', 'hover:text-blue-700', 'hover:text-blue-800', 'hover:text-blue-900',
    
    // Green
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',
    'text-green-50', 'text-green-100', 'text-green-200', 'text-green-300', 'text-green-400', 'text-green-500', 'text-green-600', 'text-green-700', 'text-green-800', 'text-green-900',
    'border-green-50', 'border-green-100', 'border-green-200', 'border-green-300', 'border-green-400', 'border-green-500', 'border-green-600', 'border-green-700', 'border-green-800', 'border-green-900',
    'hover:bg-green-50', 'hover:bg-green-100', 'hover:bg-green-200', 'hover:bg-green-300', 'hover:bg-green-400', 'hover:bg-green-500', 'hover:bg-green-600', 'hover:bg-green-700', 'hover:bg-green-800', 'hover:bg-green-900',
    'hover:text-green-50', 'hover:text-green-100', 'hover:text-green-200', 'hover:text-green-300', 'hover:text-green-400', 'hover:text-green-500', 'hover:text-green-600', 'hover:text-green-700', 'hover:text-green-800', 'hover:text-green-900',

    // Yellow
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900',
    'text-yellow-50', 'text-yellow-100', 'text-yellow-200', 'text-yellow-300', 'text-yellow-400', 'text-yellow-500', 'text-yellow-600', 'text-yellow-700', 'text-yellow-800', 'text-yellow-900',
    'border-yellow-50', 'border-yellow-100', 'border-yellow-200', 'border-yellow-300', 'border-yellow-400', 'border-yellow-500', 'border-yellow-600', 'border-yellow-700', 'border-yellow-800', 'border-yellow-900',

    // Purple
    'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900',
    'text-purple-50', 'text-purple-100', 'text-purple-200', 'text-purple-300', 'text-purple-400', 'text-purple-500', 'text-purple-600', 'text-purple-700', 'text-purple-800', 'text-purple-900',
    'border-purple-50', 'border-purple-100', 'border-purple-200', 'border-purple-300', 'border-purple-400', 'border-purple-500', 'border-purple-600', 'border-purple-700', 'border-purple-800', 'border-purple-900',

    // Pink
    'bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900',
    'text-pink-50', 'text-pink-100', 'text-pink-200', 'text-pink-300', 'text-pink-400', 'text-pink-500', 'text-pink-600', 'text-pink-700', 'text-pink-800', 'text-pink-900',
    'border-pink-50', 'border-pink-100', 'border-pink-200', 'border-pink-300', 'border-pink-400', 'border-pink-500', 'border-pink-600', 'border-pink-700', 'border-pink-800', 'border-pink-900',

    // Indigo
    'bg-indigo-50', 'bg-indigo-100', 'bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400', 'bg-indigo-500', 'bg-indigo-600', 'bg-indigo-700', 'bg-indigo-800', 'bg-indigo-900',
    'text-indigo-50', 'text-indigo-100', 'text-indigo-200', 'text-indigo-300', 'text-indigo-400', 'text-indigo-500', 'text-indigo-600', 'text-indigo-700', 'text-indigo-800', 'text-indigo-900',
    'border-indigo-50', 'border-indigo-100', 'border-indigo-200', 'border-indigo-300', 'border-indigo-400', 'border-indigo-500', 'border-indigo-600', 'border-indigo-700', 'border-indigo-800', 'border-indigo-900',
    
    // Teal
    'bg-teal-50', 'bg-teal-100', 'bg-teal-200', 'bg-teal-300', 'bg-teal-400', 'bg-teal-500', 'bg-teal-600', 'bg-teal-700', 'bg-teal-800', 'bg-teal-900',
    'text-teal-50', 'text-teal-100', 'text-teal-200', 'text-teal-300', 'text-teal-400', 'text-teal-500', 'text-teal-600', 'text-teal-700', 'text-teal-800', 'text-teal-900',
    'border-teal-50', 'border-teal-100', 'border-teal-200', 'border-teal-300', 'border-teal-400', 'border-teal-500', 'border-teal-600', 'border-teal-700', 'border-teal-800', 'border-teal-900',
    
    // Orange
    'bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900',
    'text-orange-50', 'text-orange-100', 'text-orange-200', 'text-orange-300', 'text-orange-400', 'text-orange-500', 'text-orange-600', 'text-orange-700', 'text-orange-800', 'text-orange-900',
    'border-orange-50', 'border-orange-100', 'border-orange-200', 'border-orange-300', 'border-orange-400', 'border-orange-500', 'border-orange-600', 'border-orange-700', 'border-orange-800', 'border-orange-900',

    // Rose
    'bg-rose-50', 'bg-rose-100', 'bg-rose-200', 'bg-rose-300', 'bg-rose-400', 'bg-rose-500', 'bg-rose-600', 'bg-rose-700', 'bg-rose-800', 'bg-rose-900',
    'text-rose-50', 'text-rose-100', 'text-rose-200', 'text-rose-300', 'text-rose-400', 'text-rose-500', 'text-rose-600', 'text-rose-700', 'text-rose-800', 'text-rose-900',
    'border-rose-50', 'border-rose-100', 'border-rose-200', 'border-rose-300', 'border-rose-400', 'border-rose-500', 'border-rose-600', 'border-rose-700', 'border-rose-800', 'border-rose-900',
  ],
  plugins: [],
}