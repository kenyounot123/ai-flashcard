import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { ThemeProvider } from '@mui/material/styles';
import "./globals.css";
import theme from "@/theme";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Box } from "@mui/material";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Flash Prep AI",
  description: "Elevate your study game with AI-powered flashcards. Ace your exams and master new topics with ease!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/" publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">  
        <body className={inter.className}>
          <ThemeProvider theme={theme}>
            <Navbar />
              <Box sx={{minHeight: "800px"}}>{children}</Box>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
