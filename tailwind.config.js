/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        LightTaupe: '#B77E66',
        Temptress: '#471E22',
        bg: 'rgba(34, 27, 24, 0.60)',
        CitrineBrown: '#903711',
        Coconut: '#9E5A3D',
        CoffeeCardBg: 'rgba(115, 74, 57, 0.88)',
        Cornsilk: '#FFFADA',
      },
      fontFamily: {
        secondary: ['Inter', 'sans-serif'],
        third: ['Irish Grover', 'system-ui'],
      },
    },
  },
  plugins: [],
};
