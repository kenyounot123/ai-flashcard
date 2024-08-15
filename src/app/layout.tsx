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
import { Analytics } from "@vercel/analytics/react"
import { Box } from "@mui/material";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Flash Prep AI",
  description: "Elevate your study game with AI-powered flashcards. Ace your exams and master new topics with ease!",
  keywords: "Flash Prep AI, OpenAI, Stripe, Flashcards, Study set, Studying",
  openGraph: {
    title: "Flash Prep AI – The Future of Smarter Studying",
    description: "Unlock your full potential with Flash Prep AI's adaptive, AI-powered flashcards. Master any subject, boost retention, and ace your exams with personalized study sets",
    url: "https://flashprepai.com",  // Replace with your actual website URL
    type: "website",
    images: "/flashprepai.png",  // Replace with the actual URL of the image you want to use
  }
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
