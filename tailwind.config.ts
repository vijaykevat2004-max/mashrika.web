import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0b1f38',
        steel: '#4e627a',
        accent: '#f47c20',
        ink: '#0a1220'
      },
      boxShadow: {
        premium: '0 20px 40px rgba(3, 10, 25, 0.2)'
      },
      backgroundImage: {
        'mesh-grid':
          'radial-gradient(circle at 20% 20%, rgba(244,124,32,.16), transparent 35%), radial-gradient(circle at 80% 0%, rgba(74,98,122,.28), transparent 38%), linear-gradient(120deg, rgba(9,22,44,.98), rgba(12,36,64,.86))'
      }
    }
  },
  plugins: []
};

export default config;
