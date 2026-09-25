import localFont from 'next/font/local';

const fontSans = localFont({
  src: './fonts/Inter-latin.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-sans',
});

export const fonts = [fontSans.variable];
