import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        roboto: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
        poppins: ['var(--font-poppins)', ...defaultTheme.fontFamily.sans],
        lato: ['var(--font-lato)', ...defaultTheme.fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        openSans: ['var(--font-open-sans)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
