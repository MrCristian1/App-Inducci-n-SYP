/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'ml-0',
    'ml-8',
    'ml-16', 
    'ml-24',
    'ml-32',
    'ml-40'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#457b9d',
          dark: '#1d3557',
          light: '#a8dadc',
        },
        secondary: {
          DEFAULT: '#e63946',
          dark: '#c1121f',
          light: '#ffccd5',
        },
        light: '#f1faee',
        accent: {
          DEFAULT: '#e63946',
          dark: '#c1121f',
          light: '#ffccd5',
        },
        success: {
          DEFAULT: '#457b9d',
          dark: '#1d3557',
          light: '#a8dadc',
        },
        warning: {
          DEFAULT: '#e63946',
          dark: '#c1121f',
          light: '#ffccd5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'badge-reveal': 'badgeReveal 1s forwards',
        'confetti': 'confetti 5s ease-in-out forwards',
        'node-complete': 'nodeComplete 0.5s ease-in-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'star-twinkle': 'starTwinkle 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        badgeReveal: {
          '0%': { transform: 'scale(0) rotate(-45deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(0)', opacity: '1' },
        },
        confetti: {
          '0%': { transform: 'translateY(-100vh)', opacity: '1' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        nodeComplete: {
          '0%': { backgroundColor: 'transparent', borderColor: 'var(--color-primary)' },
          '100%': { backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        starTwinkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.5)' },
          '50%': { opacity: '1', transform: 'scale(1.5)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 10px 30px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}