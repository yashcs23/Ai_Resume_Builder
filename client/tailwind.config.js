/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-main': '#0a0a0f',
        'bg-secondary': '#13141f',
        'bg-glass': 'rgba(19, 20, 31, 0.6)',
        'bg-card': '#181926',
        'text-main': '#f8fafc',
        'text-muted': '#94a3b8',
        'primary': {
          DEFAULT: '#6366f1',
          glow: 'rgba(99, 102, 241, 0.4)',
        },
        'secondary': {
          DEFAULT: '#8b5cf6',
          glow: 'rgba(139, 92, 246, 0.4)',
        },
        'accent': '#0ea5e9',
      },
      borderRadius: {
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
      },
      animation: {
        'float': 'float 6s infinite ease-in-out',
        'float-slow': 'float 8s infinite ease-in-out',
        'fadeInUp': 'fadeInUp 0.8s ease-out both',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
