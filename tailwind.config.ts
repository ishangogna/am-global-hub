import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF7F2',
        primary: '#0F172A',
        gold: '#B88A44',
        goldLight: '#D4AF6A',
        muted: '#6B7280',
      },
      boxShadow: {
        luxury: '0 20px 60px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        luxury: '28px',
      },
      maxWidth: {
        premium: '1400px',
      },
    },
  },
  plugins: [],
}

export default config