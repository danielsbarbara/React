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
    },
    fontFamily: {
      title: ["flyeaglesfly"],
      text: ["bebas-neue"]
    }
  },
  plugins: [],
}
export default config
