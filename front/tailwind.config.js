import plugin from "tailwindcss";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Custom Font", "sans-serif"],
      },
    },
  },
  plugins: [plugin(), daisyui],
};
