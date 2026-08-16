/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif']
      },
      colors: {
        blush: {
          50: '#fff5fb',
          100: '#ffe4f3',
          200: '#ffc2e6',
          300: '#ff9ad6'
        },
        orchid: {
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce'
},
        ink: {
          700: '#2e1065',
          800: '#1e0a4a',
          900: '#160735'
        },
        indigoDeep: '#3730a3',
        deepBlue: '#1e3a8a'
      },
      backgroundImage: {
        'aurora':
          'linear-gradient(120deg, #ffe4f3 0%, #f5d0fe 25%, #ddd6fe 50%, #c7d2fe 75%, #fbcfe8 100%)',
        'aurora-dark':
          'linear-gradient(120deg, #7e22ce 0%, #a855f7 40%, #ec4899 100%)'
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(90, 30, 130, 0.15)',
        glow: '0 0 40px rgba(168, 85, 247, 0.35)'
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease forwards'
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' }
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        }
      },
      borderRadius: {
        '3xl': '1.75rem',
        '4xl': '2.25rem'
      }
    }
  },
  plugins: []
}
