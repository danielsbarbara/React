import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './Components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'eagle': "url('/images/eagleLoginBack.jpg')",
        'shoes': "url('/images/cardBackground.jpg')",
        'lboard': "url('/images/leadboardRun.jpg')"
      },
    },
  },
  plugins: [],
}
export default config
