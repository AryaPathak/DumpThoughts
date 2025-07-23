import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {  Roboto, Poppins, Lato, Montserrat, Open_Sans } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-poppins' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-lato' });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-open-sans' });


export const metadata: Metadata = {
  title: "DumpThoughts",
  description: "SMA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
}
