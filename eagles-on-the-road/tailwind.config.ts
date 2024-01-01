import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'eagle': "url('/images/eaglesBack.jpg')",
        'shoes': "url('/images/cardBackground.jpg')",
        'lboard': "url('/images/leadboardRun.jpg')"
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        wiggleReverse: {
          '0%, 100%': { transform: 'rotate(10deg)' },
          '50%': { transform: 'rotate(-5deg)' },
        }
      }
    },
    fontFamily: {
      title: ["flyeaglesfly"],
      text: ["bebas-neue"]
    }
  },
  plugins: [],
}
export default config
