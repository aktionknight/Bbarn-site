/** @type {import('tailwindcss').Config} */
export default {
  // This line is CRITICAL. It tells Tailwind where your code lives.
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily :
      {
       bbarn : ['"Lexend"','sans-serif'],
       helvetica : ['"Helvetica"','sans-serif']
      }
    },
  },
  plugins: [],
}