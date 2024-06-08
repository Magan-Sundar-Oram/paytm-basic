/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'border-move': 'border-move 1s linear infinite', // Define the border move animation
      },
      keyframes: {
        'border-move': {
          '0%': { 
            borderWidth: '0px', 
            borderColor: 'transparent',
          },
          '50%': {
            borderWidth: '3.5px', 
            borderColor: 'blue',
          },
          '100%': { 
            borderWidth: '0px', 
            borderColor: 'transparent',
          },
        },
      },
     
    },
  },
  plugins: [],
}
