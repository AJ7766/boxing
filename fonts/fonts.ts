import { Rajdhani } from "next/font/google";
import localFont from 'next/font/local';

export const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const dazn = localFont({
  src: [
    {
      path: '../public/fonts/DAZNTrim_v2.9_normal_600.woff2',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../public/fonts/DAZNTrim_v2.9_normal_800.woff2',
      weight: '800',
      style: 'extrabold',
    },
  ],
})