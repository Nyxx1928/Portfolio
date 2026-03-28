import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        manga: {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            900: '#1A1A1A',
            800: '#333333',
            600: '#666666',
            400: '#999999',
            200: '#E5E5E5',
            50: '#F5F5F5',
          },
          cyan: {
            primary: '#00BCD4',
            light: '#4DD0E1',
            dark: '#0097A7',
          },
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Courier New', 'monospace'],
      },
      spacing: {
        'panel-gap': '1.5rem',
        'section': '4rem',
      },
      borderWidth: {
        'manga': '3px',
        'manga-thick': '5px',
      },
      boxShadow: {
        'manga': '4px 4px 0px 0px rgba(0, 0, 0, 1)',
        'manga-hover': '6px 6px 0px 0px rgba(0, 0, 0, 1)',
      },
      animation: {
        'panel-reveal': 'panelReveal 0.6s ease-out',
        'ink-splash': 'inkSplash 0.4s ease-out',
        'speed-line': 'speedLine 0.3s ease-out',
      },
      keyframes: {
        panelReveal: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        inkSplash: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        speedLine: {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
