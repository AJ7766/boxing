import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1rem' }],
      sm: ['clamp(0.875rem, 1.2vw, 1rem)', { lineHeight: '1.25rem' }],
      base: ['clamp(1rem, 1.5vw, 1.125rem)', { lineHeight: '1.5rem' }],
      lg: ['clamp(1.125rem, 1.8vw, 1.25rem)', { lineHeight: '1.75rem' }],
      xl: ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.75rem' }],
      '2xl': ['clamp(1.5rem, 2.4vw, 1.875rem)', { lineHeight: '2rem' }],
      '3xl': ['clamp(1.875rem, 3vw, 2.25rem)', { lineHeight: '2.25rem' }],
      '4xl': ['clamp(2.25rem, 3.6vw, 3rem)', { lineHeight: '2.5rem' }],
      '5xl': ['clamp(3rem, 4.2vw, 3.75rem)', { lineHeight: '1' }],
      '6xl': ['clamp(3.75rem, 4.8vw, 4.5rem)', { lineHeight: '1' }],
      '7xl': ['clamp(4.5rem, 5.4vw, 5.25rem)', { lineHeight: '1' }],
      '8xl': ['clamp(5.25rem, 6vw, 6rem)', { lineHeight: '1' }],
      '9xl': ['clamp(6rem, 6.6vw, 7.5rem)', { lineHeight: '1' }],
    },
    extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
    transitionTimingFunction: {
      'swoosh-smooth': 'cubic-bezier(0.25, 0, 0.35, 1)',
    },
  },
},
plugins: [],
} satisfies Config;
