/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          // Light mode colors
          cream: '#FAF8F3',
          beige: '#F5F3EF',
          lightGray: '#EBE8E1',
          charcoal: '#2C2C2C',
          copper: '#B87333',
          darkBrown: '#3E2723',
          textDark: '#2C2C2C',
          textLight: '#5D5D5D',
          // Dark mode colors
          darkBg: '#1B0E0A',
          darkSecondary: '#3E2723',
          darkCard: '#5D4037',
          darkText: '#F5F1EB',
          darkTextSecondary: 'rgba(245, 241, 235, 0.8)',
          // Additional colors used across the site
          black: '#000000',
          white: '#FFFFFF',
          gold: '#D4AF37',
          darkGray: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

