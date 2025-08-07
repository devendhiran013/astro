/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./Components/**/*.{js,jsx,ts,tsx}",  // Include all inside Components folder
    "./app/**/*.{js,ts,jsx,tsx}"          // Just in case you're using an app folder too
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
