/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        LightTaupe: '#B77E66',
        Temptress: '#471E22',
        bg: 'rgba(34, 27, 24, 0.60)',
        cream: '#e6d7c2',
        brown: '#6f4e37',
      },
      fontFamily: {
        secondary: ['Inter', 'sans-serif'],
        third: ['Irish Grover', 'system-ui'],
      },
      dropShadow: {
        ReviewCardShadow: '0px 10px 20px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [],
};
