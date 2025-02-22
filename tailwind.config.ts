import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        '15': '15px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      transitionTimingFunction: {
        'swoosh-smooth': 'cubic-bezier(0.25, 0, 0.35, 1)',
      },
      boxShadow: {
        'text': '1px 1px 2px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: { [key: string]: { textShadow: string } }, options?: { respectPrefix?: boolean, respectImportant?: boolean }) => void }) {
      addUtilities({
        '.text-shadow': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.4)',
        },
      });
    },
  ],
} satisfies Config;
