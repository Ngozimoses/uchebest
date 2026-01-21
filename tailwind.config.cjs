// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8B5CF6',
        gold: '#F59E0B',
        dark: '#0F0F0F', // Deep black for glassmorphism
        card: 'rgba(15, 15, 15, 0.7)', // Semi-transparent dark
        text: '#FFFFFF',
        leafGreen: '#16A34A', // Vibrant green
        fern: '#1D4024', // Dark forest green
      },
      backgroundImage: {
        'fern-pattern': "url('https://images.unsplash.com/photo-1583744946570-2a674c5245d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        'tropical-leaves': "url('https://images.unsplash.com/photo-1599599810769-1f9b4e56e77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(10px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function ({ addUtilities }) {
      addUtilities({
        '.backdrop-blur': {
          '-webkit-backdrop-filter': 'blur(10px)',
          'backdrop-filter': 'blur(10px)',
        },
      });
    },
  ],
}