import { Rajdhani } from "next/font/google";
import localFont from 'next/font/local';

export const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: 'swap',
});

export const dazn = localFont({
  src: [
    {
      path: '../public/fonts/DAZNTrim_v2.9_normal_600.woff2',
      weight: '600',
      style: 'semibold',
    },
  ],
})