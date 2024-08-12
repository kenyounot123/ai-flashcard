import type { Metadata } from "next";
import localFont from 'next/font/local'
import theme from '../theme'; // Adjust the path as needed
import { Inter } from "next/font/google"
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";

const virgil = localFont({
  src: '../../public/fonts/Virgil.woff2',
  display: 'swap',
})
const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "AI Flashcards",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider theme={theme}>
        <body className={inter.className}>{children}</body>
      </ThemeProvider>
    </html>
  );
}
