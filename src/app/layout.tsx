import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";
import theme from "@/theme";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

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
    <ClerkProvider>
      <html lang="en">  
        <body className={inter.className} style={{height: '100vh'}}>
          <ThemeProvider theme={theme}>
            <Navbar />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
