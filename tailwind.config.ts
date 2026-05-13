import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#B88A44',
        primary: '#0F172A',
        muted: '#667085',
      },
    },
  },
  plugins: [],
}

export default config