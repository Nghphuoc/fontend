/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Include all source files
  ],
  theme: {
    extend: {
      colors: {
        customRed: "#da3c3b",
      },
    },
  },
  plugins: [],
};

