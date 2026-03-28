/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060816',
        panel: '#0c1228',
        muted: '#8f9bb7',
        accent: '#38bdf8',
        neon: '#8b5cf6',
        success: '#10b981',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px rgba(56, 189, 248, 0.18)',
        glass: '0 18px 80px rgba(3, 8, 24, 0.55)',
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 34%), radial-gradient(circle at top right, rgba(139, 92, 246, 0.18), transparent 30%), linear-gradient(180deg, rgba(6, 8, 22, 0.96), rgba(5, 7, 18, 1))',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};