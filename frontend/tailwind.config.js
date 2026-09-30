/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:       '#0d1117',
        surface:  '#161b22',
        'surface-2': '#1c2128',
        border:   '#30363d',
        primary:  '#e6edf3',
        secondary:'#8b949e',
        muted:    '#484f58',
        accent: {
          DEFAULT: '#58a6ff',
          hover:   '#388bfd',
          muted:   '#1f6feb',
          faint:   '#1f6feb1a',
        },
        success: '#3fb950',
        warning: '#d29922',
        danger:  '#f85149',
      },
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      keyframes: {
        fadeIn:    { from: { opacity: '0' },                   to: { opacity: '1' } },
        slideUp:   { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.95)' },      to: { opacity: '1', transform: 'scale(1)' } },
        pulse2:    { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
        shimmer:   { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
      animation: {
        'fade-in':   'fadeIn 0.25s ease forwards',
        'slide-up':  'slideUp 0.3s ease forwards',
        'slide-down':'slideDown 0.2s ease forwards',
        'scale-in':  'scaleIn 0.2s ease forwards',
        'pulse2':    'pulse2 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
