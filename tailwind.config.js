/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#06020399',
          950: '#0a0205',
          1000: '#050203',
        },
        blood: {
          50: '#fff1f3',
          200: '#ffb8c1',
          400: '#ff4d63',
          500: '#ff1f3a',
          600: '#c8102e',
          700: '#9a0a23',
          800: '#5a0612',
          900: '#33040c',
        },
        bone: {
          50: '#fbf3f4',
          200: '#e8d4d7',
          400: '#b5979b',
          600: '#7a5b5f',
        },
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.6 0 0 0 0 0.05 0 0 0 0 0.08 0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        'radial-blood': 'radial-gradient(ellipse at center, rgba(200,16,46,0.18) 0%, rgba(10,2,5,0) 70%)',
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(255,31,58,0.35)',
        'glow':    '0 0 28px rgba(255,31,58,0.45), 0 0 60px rgba(200,16,46,0.25)',
        'glow-lg': '0 0 60px rgba(255,31,58,0.55), 0 0 120px rgba(200,16,46,0.35)',
        'inset-glow': 'inset 0 0 30px rgba(255,31,58,0.18)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-red': 'pulseRed 2.5s ease-in-out infinite',
        'rain': 'rain 1.1s linear infinite',
        'flicker': 'flicker 4s linear infinite',
        'eq': 'eq 1.1s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseRed: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,31,58,0.45)' },
          '50%':      { boxShadow: '0 0 40px 8px rgba(255,31,58,0.15)' },
        },
        rain: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0' },
          '20%':  { opacity: '0.6' },
          '100%': { transform: 'translateY(100vh)', opacity: '0' },
        },
        flicker: {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: '1' },
          '20%, 24%, 55%': { opacity: '0.4' },
        },
        eq: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%':      { transform: 'scaleY(1)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
