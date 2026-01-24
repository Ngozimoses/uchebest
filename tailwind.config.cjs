module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Light Mode Colors
        light: '#FAFAFA',
        cardLight: 'rgba(255, 255, 255, 0.9)',
        textLight: '#1F2937',
        
        // Dark Mode Colors (unchanged but prefixed)
        primary: '#8B5CF6',
        gold: '#F59E0B',
        dark: '#0F0F0F',
        card: 'rgba(15, 15, 15, 0.7)',
        text: '#FFFFFF',
        leafGreen: '#16A34A',
        fern: '#1D4024',
        
        // Additional light mode specific colors
        borderLight: '#E5E7EB',
        borderDark: '#374151',
        surfaceLight: '#FFFFFF',
        surfaceDark: '#111827',
        mutedLight: '#6B7280',
        mutedDark: '#9CA3AF',
      },
      backgroundImage: {
        'fern-pattern': "url('https://images.unsplash.com/photo-1583744946570-2a674c5245d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        'tropical-leaves': "url('https://images.unsplash.com/photo-1599599810769-1f9b4e56e77a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
        'light-gradient': 'linear-gradient(135deg, #FAFAFA 0%, #F3F4F6 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F0F0F 0%, #1F2937 100%)',
      },
      backdropFilter: {
        none: 'none',
        blur: 'blur(10px)',
      },
      boxShadow: {
        'light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'light-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
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